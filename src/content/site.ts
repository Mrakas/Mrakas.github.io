export type Locale = "en" | "zh";

export type LocalizedText = Record<Locale, string>;

export type MediaItem = {
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: LocalizedText;
  caption: LocalizedText;
};

export type ProjectLink = {
  label: LocalizedText;
  href: string;
};

export type Project = {
  slug: string;
  year: string;
  title: string;
  kicker: LocalizedText;
  summary: LocalizedText;
  description: LocalizedText[];
  tags: string[];
  cover: string;
  coverAlt: LocalizedText;
  media: MediaItem[];
  links: ProjectLink[];
};

export type Note = {
  slug: string;
  date: string;
  title: LocalizedText;
  summary: LocalizedText;
  sections: Array<{
    heading: LocalizedText;
    paragraphs: LocalizedText[];
  }>;
  projectSlug: string;
};

export const baseUrl = "https://mrakas.github.io";

export const labels = {
  en: {
    home: "Home",
    work: "Work",
    gallery: "Gallery",
    notes: "Notes",
    about: "About",
    language: "中文",
    selectedWorks: "Selected works",
    hero: "An archive of systems, benchmarks, and visual experiments.",
    subhero:
      "Two projects exploring how machines understand moving worlds—and how creative systems can make those worlds inspectable.",
    viewProject: "View project",
    allWork: "All work",
    openLink: "Open link",
    backToWork: "Back to work",
    projectMedia: "Project media",
    relatedNote: "Read the project note",
    galleryIntro: "Frames, diagrams, interfaces, and moving-image experiments from the archive.",
    notesIntro: "Short, source-grounded notes on the ideas and systems behind the work.",
    aboutIntro:
      "Marcus Kwan makes and studies systems for video generation, world models, and multimodal reasoning.",
    aboutSecond:
      "This site is an evolving archive of selected projects, experiments, and the artifacts around them.",
    contact: "Contact",
    source: "Source",
    notFound: "This page is not in the archive.",
    returnHome: "Return home",
  },
  zh: {
    home: "首页",
    work: "作品",
    gallery: "展厅",
    notes: "笔记",
    about: "关于",
    language: "EN",
    selectedWorks: "精选作品",
    hero: "一个关于系统、基准与视觉实验的档案馆。",
    subhero: "两个项目，分别探索机器如何理解动态世界，以及创作系统如何让这些世界可检查、可编辑。",
    viewProject: "查看项目",
    allWork: "全部作品",
    openLink: "打开链接",
    backToWork: "返回作品",
    projectMedia: "项目素材",
    relatedNote: "阅读项目笔记",
    galleryIntro: "来自项目档案的画面、图表、界面与动态图像实验。",
    notesIntro: "基于公开资料，对作品背后的方法与系统所作的简短记录。",
    aboutIntro: "Marcus Kwan 关注视频生成、世界模型与多模态推理系统。",
    aboutSecond: "这个网站是一个持续更新的档案馆，用来收藏选定项目、实验及其相关素材。",
    contact: "联系方式",
    source: "资料来源",
    notFound: "档案馆中没有这个页面。",
    returnHome: "返回首页",
  },
} as const;

export const projects: Project[] = [
  {
    slug: "video-mme-logical",
    year: "2026",
    title: "Video-MME-Logical",
    kicker: {
      en: "Benchmark · Video understanding",
      zh: "基准 · 视频理解",
    },
    summary: {
      en: "A benchmark for evaluating logical and temporal reasoning in video-capable multimodal models.",
      zh: "一个用于评测多模态模型视频逻辑推理与时序推理能力的基准。",
    },
    description: [
      {
        en: "Video-MME-Logical isolates reasoning in controlled moving scenes: objects are counted, tracked, hidden, rotated, and transformed over time. The benchmark makes it possible to inspect not only whether a model answers correctly, but which kinds of temporal logic remain difficult.",
        zh: "Video-MME-Logical 在受控的动态场景中拆解推理能力：物体会随时间被计数、追踪、遮挡、旋转和变换。它不仅关注模型是否答对，也让不同类型的时序逻辑难点变得可检查。",
      },
      {
        en: "The public release includes the paper, dataset, evaluation code, leaderboard, representative tasks, and an agent-oriented reproduction guide.",
        zh: "公开版本包含论文、数据集、评测代码、排行榜、代表性任务，以及面向 Agent 的复现指南。",
      },
    ],
    tags: ["Benchmark", "Video reasoning", "Multimodal LLM", "Temporal logic"],
    cover: "/images/showcase/video-mme/figure1.png",
    coverAlt: {
      en: "Video-MME-Logical benchmark overview",
      zh: "Video-MME-Logical 基准总览",
    },
    media: [
      {
        type: "image",
        src: "/images/showcase/video-mme/figure2.png",
        alt: { en: "Benchmark construction pipeline", zh: "基准构建流程" },
        caption: { en: "Benchmark construction pipeline", zh: "基准构建流程" },
      },
      {
        type: "video",
        src: "/images/showcase/video-mme/magic.mp4",
        poster: "/images/showcase/video-mme/figure1.png",
        alt: { en: "Magic transformation task", zh: "Magic 变换任务" },
        caption: { en: "Magic transformation task", zh: "Magic 变换任务" },
      },
      {
        type: "video",
        src: "/images/showcase/video-mme/maze3d.mp4",
        poster: "/images/showcase/video-mme/figure2.png",
        alt: { en: "3D maze reasoning task", zh: "三维迷宫推理任务" },
        caption: { en: "3D maze reasoning task", zh: "三维迷宫推理任务" },
      },
      {
        type: "video",
        src: "/images/showcase/video-mme/cups.mp4",
        poster: "/images/showcase/video-mme/screenshot-dark.png",
        alt: { en: "Object tracking with cups", zh: "杯子物体追踪任务" },
        caption: { en: "Object tracking with cups", zh: "杯子物体追踪任务" },
      },
    ],
    links: [
      {
        label: { en: "Project page", zh: "项目主页" },
        href: "https://mrakas.github.io/video-mme-logical/",
      },
      {
        label: { en: "Paper", zh: "论文" },
        href: "https://arxiv.org/abs/2606.27828",
      },
      {
        label: { en: "Code", zh: "代码" },
        href: "https://github.com/Mrakas/video-mme-logical",
      },
      {
        label: { en: "Dataset", zh: "数据集" },
        href: "https://huggingface.co/datasets/marcuskwan/video-mme-logical",
      },
    ],
  },
  {
    slug: "storycanvas",
    year: "2026",
    title: "StoryCanvas",
    kicker: {
      en: "Creative systems · Media DAG",
      zh: "创作系统 · 媒体 DAG",
    },
    summary: {
      en: "An agentic, provenance-first harness that compiles story plans into editable ComfyUI workflows for image and video generation.",
      zh: "一个以 Agent 与可追溯性为核心的创作框架，将故事计划编译为可编辑的 ComfyUI 图像与视频工作流。",
    },
    description: [
      {
        en: "StoryCanvas turns a story prompt into an inspectable media graph rather than a single opaque generation. Story structure, visual continuity, shot-level decisions, generated media, and provenance stay connected in one editable canvas.",
        zh: "StoryCanvas 将故事提示转化为可检查的媒体图，而不是一次不透明的生成。故事结构、视觉连续性、镜头级决策、生成素材与来源信息都被连接在同一个可编辑画布中。",
      },
      {
        en: "The Moon Garden demo is a sanitized real run with one story prompt, a visual bible, three shot branches, agent activity, and inspectable outputs.",
        zh: "Moon Garden 演示来自一次经过清理的真实运行，包含故事提示、视觉设定、三条镜头分支、Agent 活动与可检查输出。",
      },
    ],
    tags: ["ComfyUI", "Agent harness", "Media DAG", "Provenance"],
    cover: "/images/showcase/storycanvas/pipeline-poster.webp",
    coverAlt: {
      en: "StoryCanvas Moon Garden pipeline",
      zh: "StoryCanvas Moon Garden 流程",
    },
    media: [
      {
        type: "video",
        src: "/images/showcase/storycanvas/pipeline-demo.mp4",
        poster: "/images/showcase/storycanvas/pipeline-poster.webp",
        alt: { en: "StoryCanvas pipeline demo", zh: "StoryCanvas 流程演示" },
        caption: { en: "Moon Garden · 28-second pipeline demo", zh: "Moon Garden · 28 秒流程演示" },
      },
      {
        type: "image",
        src: "/images/showcase/storycanvas/figure1.svg",
        alt: { en: "StoryCanvas system overview", zh: "StoryCanvas 系统总览" },
        caption: { en: "From fragmented tools to an inspectable story harness", zh: "从割裂工具到可检查的故事创作框架" },
      },
      {
        type: "image",
        src: "/images/showcase/storycanvas/architecture.svg",
        alt: { en: "StoryCanvas plugin architecture", zh: "StoryCanvas 插件架构" },
        caption: { en: "Plugin architecture and extension contract", zh: "插件架构与扩展契约" },
      },
      {
        type: "image",
        src: "/images/showcase/storycanvas/moon-garden.png",
        alt: { en: "Moon Garden generated frame", zh: "Moon Garden 生成画面" },
        caption: { en: "A generated frame preserved inside the media DAG", zh: "保存在媒体 DAG 中的生成画面" },
      },
    ],
    links: [
      {
        label: { en: "Code", zh: "代码" },
        href: "https://github.com/Mrakas/ComfyUI-StoryCanvas-Harness",
      },
      {
        label: { en: "Moon Garden archive", zh: "Moon Garden 档案" },
        href: "https://github.com/Mrakas/ComfyUI-StoryCanvas-Harness/tree/main/examples/moon_garden_canvas",
      },
    ],
  },
];

export const notes: Note[] = [
  {
    slug: "video-mme-logical",
    date: "2026-06-30",
    title: {
      en: "Video-MME-Logical: reasoning in moving worlds",
      zh: "Video-MME-Logical：在动态世界中推理",
    },
    summary: {
      en: "Why controlled video tasks reveal failures that broad video benchmarks can hide.",
      zh: "为什么受控视频任务能够揭示综合视频基准容易掩盖的失败。",
    },
    projectSlug: "video-mme-logical",
    sections: [
      {
        heading: { en: "The question", zh: "问题" },
        paragraphs: [
          {
            en: "A model can appear capable on a broad video benchmark while relying on recognition, language priors, or static cues. Video-MME-Logical asks a narrower question: can the model preserve and manipulate state as a scene changes over time?",
            zh: "模型可能在综合视频基准上表现良好，却主要依赖识别能力、语言先验或静态线索。Video-MME-Logical 提出一个更窄的问题：当场景随时间变化时，模型能否保持并操作其中的状态？",
          },
        ],
      },
      {
        heading: { en: "The design", zh: "设计" },
        paragraphs: [
          {
            en: "The benchmark uses controllable scenes and task families such as counting, occlusion, tracking, rotation, and spatial transformation. Difficulty can be varied while the underlying rule remains inspectable.",
            zh: "该基准使用可控场景，并覆盖计数、遮挡、追踪、旋转与空间变换等任务族。在保持底层规则可检查的同时，可以系统地调节难度。",
          },
        ],
      },
      {
        heading: { en: "What is public", zh: "公开内容" },
        paragraphs: [
          {
            en: "The public repository links the paper, dataset, evaluation code, compact leaderboard, representative figures, and reproduction guidance. This note summarizes those materials; it does not introduce claims beyond them.",
            zh: "公开仓库包含论文、数据集、评测代码、精简排行榜、代表性图表与复现指南。本笔记只总结这些材料，不额外引入超出公开资料的结论。",
          },
        ],
      },
    ],
  },
  {
    slug: "storycanvas",
    date: "2026-08-30",
    title: {
      en: "StoryCanvas: keeping the creative process inspectable",
      zh: "StoryCanvas：让创作过程保持可检查",
    },
    summary: {
      en: "A media-DAG approach to connecting story plans, agent decisions, and generated outputs.",
      zh: "一种用媒体 DAG 连接故事计划、Agent 决策与生成结果的方法。",
    },
    projectSlug: "storycanvas",
    sections: [
      {
        heading: { en: "Beyond a final render", zh: "不止最终成片" },
        paragraphs: [
          {
            en: "A generated image or video shows the result but often hides the decisions that produced it. StoryCanvas keeps prompts, continuity assets, shot branches, tools, and outputs connected as an editable graph.",
            zh: "一张生成图像或一段视频只能展示结果，却经常隐藏产生结果的决策。StoryCanvas 将提示、连续性素材、镜头分支、工具与输出保留在同一个可编辑图中。",
          },
        ],
      },
      {
        heading: { en: "The canvas", zh: "画布" },
        paragraphs: [
          {
            en: "The harness compiles a story plan into composable media nodes and can export a completed run as a standalone viewer. The canvas is therefore both a creative surface and a provenance record.",
            zh: "该框架将故事计划编译为可组合的媒体节点，并能把完成的运行导出为独立查看器。因此，Canvas 既是创作界面，也是可追溯记录。",
          },
        ],
      },
      {
        heading: { en: "A concrete demo", zh: "具体演示" },
        paragraphs: [
          {
            en: "The public Moon Garden example demonstrates one story prompt, a visual bible, three shots, agent activity, and generated image/video assets. The repository describes it as a sanitized real run.",
            zh: "公开的 Moon Garden 示例展示了一个故事提示、视觉设定、三个镜头、Agent 活动以及生成的图像和视频素材。仓库将其描述为一次经过清理的真实运行。",
          },
        ],
      },
    ],
  },
];

export const galleryItems = [
  {
    src: "/images/showcase/storycanvas/pipeline-poster.webp",
    projectSlug: "storycanvas",
    alt: { en: "StoryCanvas pipeline interface", zh: "StoryCanvas 流程界面" },
  },
  {
    src: "/images/showcase/video-mme/figure1.png",
    projectSlug: "video-mme-logical",
    alt: { en: "Video-MME-Logical overview", zh: "Video-MME-Logical 总览" },
  },
  {
    src: "/images/showcase/storycanvas/moon-garden.png",
    projectSlug: "storycanvas",
    alt: { en: "Moon Garden frame", zh: "Moon Garden 画面" },
  },
  {
    src: "/images/showcase/video-mme/screenshot-dark.png",
    projectSlug: "video-mme-logical",
    alt: { en: "Video-MME-Logical project page", zh: "Video-MME-Logical 项目页" },
  },
  {
    src: "/images/showcase/storycanvas/figure1.svg",
    projectSlug: "storycanvas",
    alt: { en: "StoryCanvas system figure", zh: "StoryCanvas 系统图" },
  },
  {
    src: "/images/showcase/video-mme/figure2.png",
    projectSlug: "video-mme-logical",
    alt: { en: "Benchmark construction pipeline", zh: "基准构建流程" },
  },
  {
    src: "/images/showcase/storycanvas/architecture.svg",
    projectSlug: "storycanvas",
    alt: { en: "StoryCanvas architecture", zh: "StoryCanvas 架构" },
  },
  {
    src: "/images/showcase/video-mme/title-icon.png",
    projectSlug: "video-mme-logical",
    alt: { en: "Video-MME-Logical mark", zh: "Video-MME-Logical 标识" },
  },
];

export function localize(locale: Locale, value: LocalizedText): string {
  return value[locale];
}

export function localePath(locale: Locale, path: string): string {
  if (locale === "en") return path;
  return path === "/" ? "/zh" : `/zh${path}`;
}

export function findProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function findNote(slug: string): Note | undefined {
  return notes.find((note) => note.slug === slug);
}
