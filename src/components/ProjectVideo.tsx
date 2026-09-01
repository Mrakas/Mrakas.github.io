import { Locale, localize, MediaItem } from "@/content/site";
import styles from "@/app/site.module.scss";

export function ProjectVideo({ media, locale }: { media: MediaItem; locale: Locale }) {
  return (
    <figure className={styles.mediaCard}>
      <div className={styles.mediaFrame}>
        <video
          className={styles.mediaVideo}
          controls
          playsInline
          preload="metadata"
          poster={media.poster}
          aria-label={localize(locale, media.alt)}
        >
          <source src={media.src} type="video/mp4" />
          {locale === "zh" ? "你的浏览器不支持视频播放。" : "Your browser does not support video playback."}
        </video>
      </div>
      <figcaption className={styles.mediaCaption}>{localize(locale, media.caption)}</figcaption>
    </figure>
  );
}
