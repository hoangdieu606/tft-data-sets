import Image from "next/image";
import { Augment } from "@/lib/types";
import { AugmentCardStyles, augmentCardTooltipStyles } from "@/lib/allCardStyles";

interface AugmentCardProps {
  augment: Augment;
  styles?: AugmentCardStyles;
}

export default function AugmentCard({
  augment,
  styles = augmentCardTooltipStyles,
}: AugmentCardProps) {
  const { icon, name, description, tier2 } = augment;

  return (
    <div
      className={` tier-${tier2} flex rounded-lg p-4 gap-4 ${styles.container}`}
    >
      <div className="flex items-center justify-center flex-col gap-2">
          <Image
            src={icon}
            alt={name}
            width={styles.iconSize}
            height={styles.iconSize}
            className="max-w-none"
          />
        <span className="tier-color">{tier2}</span>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-sm">{name}</h3>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </div>
  );
}
