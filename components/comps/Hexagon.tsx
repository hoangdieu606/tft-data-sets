import Image from "next/image";

interface HexagonProps {
  iconSize: number;
  imageSrc: string;
  name: string;
  className?: string;
  classNameImage?: string;
}

export default function Hexagon({
  iconSize,
  imageSrc,
  name,
  className,
  classNameImage,
}: HexagonProps) {
  const imageDimension = iconSize * 0.8;
  return (
    <div
      className={`flex justify-center items-center ${className}`}
      style={{
        width: `${iconSize}px`,
        height: `${iconSize}px`,
        clipPath: "polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)",
        background: "var(--border-color-cost, var(--color-green-900))",
      }}
    >
      <Image
        src={imageSrc}
        alt={name}
        width={imageDimension}
        height={imageDimension}
        className={`[clip-path:polygon(50%_0%,_95%_25%,_95%_75%,_50%_100%,_5%_75%,_5%_25%)] ${classNameImage}`}
      />
    </div>
  );
}
