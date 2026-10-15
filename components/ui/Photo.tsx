import Image from "next/image";
import { PHOTOS, type PhotoKey } from "@/lib/images";
import { Reveal } from "@/components/motion/Reveal";

type Props = {
  name: PhotoKey;
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** Clip-path reveal when scrolled into view */
  reveal?: boolean;
  delay?: number;
  parallax?: boolean;
  position?: string;
  /** Optional object-position used below 768px (to keep the subject in a portrait crop) */
  positionMobile?: string;
  alt?: string;
};

/** A cropped, filled photo. The parent sets the aspect ratio / height via className. */
export function Photo({
  name,
  sizes,
  className = "",
  imgClassName = "",
  priority,
  reveal = false,
  delay = 0,
  parallax = false,
  position = "center",
  positionMobile,
  alt,
}: Props) {
  const p = PHOTOS[name];
  const img = (
    <div className="clip-mask absolute inset-0">
      <div className="clip-inner zoom-img absolute inset-0">
        <Image
          src={p.src}
          alt={alt ?? p.alt}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectPosition: position, ...(positionMobile ? ({ "--pos-m": positionMobile } as React.CSSProperties) : {}) }}
          className={`object-cover ${positionMobile ? "pos-m" : ""} ${parallax ? "parallax" : ""} ${imgClassName}`}
        />
      </div>
    </div>
  );

  if (!reveal) {
    return <div className={`relative overflow-hidden ${className}`}>{img}</div>;
  }
  return (
    <Reveal
      className={`clip-reveal relative overflow-hidden ${className}`}
      delay={delay}
      threshold={0.1}
    >
      {img}
    </Reveal>
  );
}
