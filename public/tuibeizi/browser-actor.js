// Browser actor: plays 推杯子 in a REAL browser with real DOM pointer events,
// at phone viewport sizes, and checks layout. Runs inside the game's own page
// (paste into DevTools, inject with a browser tool, or via Playwright: see PROCESS.md).
//
//   await __actor.mount(390, 844)        // loads the game in a same-origin iframe at phone size
//   __actor.layout('title')              // -> list of layout problems on the current screen
//   await __actor.play(0)                // plays level 1 by tapping ◀ ▶ 推, returns result + problems
//   await __actor.runAll()               // every size x every level, returns a JSON report
(function () {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  let frame = null, W = null, D = null;
  const A = window.__actor = { log: [], sizes: [[390, 844], [360, 740], [375, 553], [430, 932]] };

  A.mount = async function (w, h) {
    if (frame) frame.remove();
    frame = document.createElement('iframe');
    frame.src = A.src || location.href.split('#')[0];
    frame.style.cssText = `width:${w}px;height:${h}px;border:0;display:block;margin:8px;background:#000`;
    const host = document.getElementById('actorStage');
    if (host) { host.innerHTML = ''; host.appendChild(frame); } else { document.body.innerHTML = ''; document.body.appendChild(frame); }
    await new Promise(r => frame.onload = r);
    W = frame.contentWindow; D = W.document;
    W.addEventListener('error', e => A.log.push('error: ' + e.message));
    try { W.localStorage.removeItem('tuibeizi-v1'); } catch (e) {}
    await sleep(600);
    return { w, h };
  };

  const rect = id => D.getElementById(id).getBoundingClientRect();
  const overlap = (a, b) => !(a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top);
  const visible = el => el && !el.hidden && el.getClientRects().length > 0;

  A.layout = function (where) {
    const p = [], vw = W.innerWidth, vh = W.innerHeight;
    const de = D.documentElement;
    if (de.scrollWidth > vw + 1) p.push(`${where}: page scrolls sideways (${de.scrollWidth} > ${vw})`);
    if (de.scrollHeight > vh + 1) p.push(`${where}: page scrolls vertically (${de.scrollHeight} > ${vh})`);
    const scr = rect('screen'), hud = rect('hud'), ctr = rect('controls');
    if (scr.width < 280) p.push(`${where}: game canvas only ${Math.round(scr.width)}px wide`);
    if (overlap(scr, hud)) p.push(`${where}: HUD overlaps the canvas`);
    if (overlap(scr, ctr)) p.push(`${where}: controls overlap the canvas`);
    if (ctr.bottom > vh) p.push(`${where}: controls cut off at the bottom`);
    for (const id of ['kL', 'kR', 'kP']) { const r = rect(id); if (r.width < 48 || r.height < 48) p.push(`${where}: ${id} tap target ${Math.round(r.width)}x${Math.round(r.height)} < 48`); }
    for (const id of ['btnSound', 'btnPause']) { const e = D.getElementById(id); if (visible(e)) { const r = e.getBoundingClientRect(); if (r.height < 32) p.push(`${where}: ${id} only ${Math.round(r.height)}px tall`); } }
    const name = D.getElementById('lvName'); if (name.scrollWidth > name.clientWidth + 1) p.push(`${where}: level name truncated`);
    const hint = D.getElementById('hint');
    if (visible(hint)) { const r = hint.getBoundingClientRect(); if (r.left < scr.left - 1 || r.right > scr.right + 1) p.push(`${where}: hint "${hint.textContent}" wider than canvas`); }
    const ov = D.getElementById('ov');
    if (visible(ov)) {
      const card = [...ov.children].find(visible);
      if (card) {
        const r = card.getBoundingClientRect();
        if (ov.scrollHeight > ov.clientHeight + 1) p.push(`${where}: ${card.id} taller than the canvas (${Math.round(r.height)} > ${Math.round(ov.clientHeight)}), needs scrolling`);
        card.querySelectorAll('button').forEach(b => { if (!visible(b)) return; const br = b.getBoundingClientRect(); if (br.height < 36) p.push(`${where}: button "${b.textContent.trim()}" only ${Math.round(br.height)}px tall`); if (br.right > r.right + 1 || br.left < r.left - 1) p.push(`${where}: button "${b.textContent.trim()}" sticks out of the card`); });
        const lv = card.querySelector('.lvls'); if (lv && lv.scrollWidth > lv.clientWidth + 1) p.push(`${where}: level buttons overflow`);
      }
    }
    return p;
  };

  // real input: pointer events on the on-screen buttons
  const held = {};
  function press(id, on) {
    if (!!held[id] === on) return; held[id] = on;
    const el = D.getElementById(id), r = el.getBoundingClientRect();
    const o = { bubbles: true, cancelable: true, pointerId: id.charCodeAt(1), pointerType: 'touch', isPrimary: true, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 };
    el.dispatchEvent(new W.PointerEvent(on ? 'pointerdown' : 'pointerup', o));
  }
  const releaseAll = () => ['kL', 'kR', 'kP'].forEach(k => press(k, false));
  const tap = id => { const b = D.getElementById(id); if (!visible(b)) throw new Error('button not visible: ' + id); b.click(); };

  // A reasonably good player: reacts ~0.3s after the "?" and stops; reads the screen state.
  A.play = async function (li, opts = {}) {
    const T = W.__T, problems = [];
    // open the level from the title screen by tapping its level button
    if (T.mode !== 'title') T.goTitle();
    await sleep(50);
    const lvBtn = D.querySelectorAll('#lvls button')[li];
    if (!lvBtn || lvBtn.disabled) return { level: li + 1, result: 'locked' };
    lvBtn.click();
    await sleep(100);
    if (T.mode !== 'intro') problems.push('intro card did not open');
    problems.push(...A.layout(`L${li + 1} intro`));
    tap('btnGo'); await sleep(100);
    if (T.mode !== 'play') problems.push('did not start after 开推');
    const t0 = performance.now(); let tellAt = 0, shot = false, pauses = 0;
    const react = opts.react ?? 300;
    while (T.mode === 'play' || T.mode === 'paused') {
      if (T.mode === 'paused') { pauses++; releaseAll(); tap('btnResume'); await sleep(50); continue; }
      const G = T.G, o = G.owner, c = G.cat;
      if (G.phase !== 'play') { releaseAll(); await sleep(50); continue; }
      const now = performance.now();
      if (o.st === 'tell') { if (!tellAt) tellAt = now; } else tellAt = 0;
      const go = o.st === 'back' || (o.st === 'tell' && now - tellAt < react);
      if (!shot && c.target) { problems.push(...A.layout(`L${li + 1} playing`)); shot = true; }
      if (go && c.target) { press('kL', false); press('kR', false); press('kP', true); }
      else if (go) {
        press('kP', false);
        const rest = G.items.filter(i => i.st === 'rest').sort((a, b) => Math.abs(a.x - c.x) - Math.abs(b.x - c.x));
        if (rest.length) { press('kR', rest[0].x > c.x); press('kL', rest[0].x <= c.x); }
      } else releaseAll();
      if (now - t0 > (G.L.time + 8) * 1000) { problems.push('stuck: level did not end'); releaseAll(); break; }
      await sleep(16);
    }
    releaseAll();
    const sec = (performance.now() - t0) / 1000;
    await sleep(1600);
    const endCard = T.G.phase === 'won' ? 'scrWin' : 'scrLose';
    if (D.getElementById(endCard).hidden) problems.push(`end card ${endCard} did not show`);
    problems.push(...A.layout(`L${li + 1} ${T.G.phase}`));
    if (pauses) problems.push(`game paused itself ${pauses}x during play`);
    return { level: li + 1, result: T.G.phase === 'won' ? 'won' : T.G.reason, seconds: +sec.toFixed(1), stars: T.G.stars || 0, problems };
  };

  A.goTitle = async () => { const T = W.__T; if (T.mode !== 'title') { const b = [...D.querySelectorAll('#ov .card:not([hidden]) button')].find(b => /标题/.test(b.textContent)); if (b) b.click(); } await sleep(100); };

  A.runAll = async function (sizes = A.sizes) {
    const report = [];
    for (const [w, h] of sizes) {
      await A.mount(w, h);
      const entry = { size: `${w}x${h}`, title: A.layout('title'), levels: [] };
      for (let li = 0; li < 5; li++) {
        W.__T.SAVE.unlocked = 5;   // unlock everything for the run
        await A.goTitle();
        let r = await A.play(li);
        if (r.result !== 'won') r = Object.assign(await (async () => { await A.goTitle(); return A.play(li); })(), { retried: r.result });
        entry.levels.push(r);
        await A.goTitle();
      }
      entry.errors = A.log.splice(0);
      report.push(entry);
    }
    return report;
  };
})();
