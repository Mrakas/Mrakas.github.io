"use client";

import { useRef, useState } from "react";
import { Locale, localize, MediaItem } from "@/content/site";
import styles from "@/app/site.module.scss";

const options = ["A", "B", "C", "D"] as const;
const correctOption = "D";

export function CupTrackingQuiz({ media, locale }: { media: MediaItem; locale: Locale }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [questionVisible, setQuestionVisible] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const copy = locale === "zh"
    ? {
        badge: "互动挑战",
        watch: "先播放视频并追踪藏着小球的杯子。问题会在视频结束后出现。",
        question: "小球最后在哪个杯子下面？",
        hint: "A–D 从左到右排列。",
        check: "检查答案",
        replay: "重新播放",
        correct: "答对了——小球最后在 D，也就是最右侧的第四个杯子下面。",
        wrong: "还差一点。正确答案是 D；重新播放，试着只追踪最开始盖住小球的杯子。",
      }
    : {
        badge: "Interactive challenge",
        watch: "Play the video and track the cup hiding the ball. The question appears when the shuffle ends.",
        question: "Which cup is the ball under at the end?",
        hint: "A–D run from left to right.",
        check: "Check answer",
        replay: "Replay",
        correct: "Correct — the ball finishes under D, the fourth cup from the left.",
        wrong: "Not quite. The answer is D; replay the video and track only the cup that first covers the ball.",
      };

  const replay = () => {
    setQuestionVisible(false);
    setSelected(null);
    setSubmitted(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      void videoRef.current.play();
    }
  };

  return (
    <figure className={`${styles.mediaCard} ${styles.quizCard}`}>
      <div className={styles.quizLayout}>
        <div className={styles.quizVideoFrame}>
          <video
            ref={videoRef}
            className={styles.mediaVideo}
            controls
            playsInline
            preload="metadata"
            poster={media.poster}
            aria-label={localize(locale, media.alt)}
            onEnded={() => setQuestionVisible(true)}
          >
            <source src={media.src} type="video/mp4" />
            {locale === "zh" ? "你的浏览器不支持视频播放。" : "Your browser does not support video playback."}
          </video>
        </div>

        <div className={styles.quizPanel}>
          <span className={styles.quizBadge}>{copy.badge}</span>
          {!questionVisible ? (
            <div className={styles.quizWaiting} aria-live="polite">
              <p>{copy.watch}</p>
              <div className={styles.quizCupGuide} aria-hidden="true">
                {options.map((option) => <span key={option}>{option}</span>)}
              </div>
            </div>
          ) : (
            <div className={styles.quizQuestionWrap}>
              <h3 className={styles.quizQuestion}>{copy.question}</h3>
              <p className={styles.quizHint}>{copy.hint}</p>
              <div className={styles.quizOptions} role="group" aria-label={copy.question}>
                {options.map((option) => {
                  const isSelected = selected === option;
                  const isCorrect = submitted && option === correctOption;
                  const isWrong = submitted && isSelected && option !== correctOption;
                  return (
                    <button
                      type="button"
                      className={`${styles.quizOption} ${isSelected ? styles.quizOptionSelected : ""} ${isCorrect ? styles.quizOptionCorrect : ""} ${isWrong ? styles.quizOptionWrong : ""}`}
                      aria-pressed={isSelected}
                      onClick={() => {
                        if (!submitted) setSelected(option);
                      }}
                      key={option}
                    >
                      <span>{option}</span>
                      <small>{locale === "zh" ? `第 ${options.indexOf(option) + 1} 个` : `Cup ${options.indexOf(option) + 1}`}</small>
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <p
                  className={`${styles.quizFeedback} ${selected === correctOption ? styles.quizFeedbackCorrect : styles.quizFeedbackWrong}`}
                  aria-live="polite"
                >
                  {selected === correctOption ? copy.correct : copy.wrong}
                </p>
              )}
              <div className={styles.quizActions}>
                {!submitted && (
                  <button
                    type="button"
                    className={styles.quizSubmit}
                    disabled={!selected}
                    onClick={() => setSubmitted(true)}
                  >
                    {copy.check}
                  </button>
                )}
                <button type="button" className={styles.quizReplay} onClick={replay}>
                  ↻ {copy.replay}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <figcaption className={styles.mediaCaption}>{localize(locale, media.caption)}</figcaption>
    </figure>
  );
}
