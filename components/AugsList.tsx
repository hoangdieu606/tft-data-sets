import Image from "next/image";
import { Augment } from "@/lib/types";

interface AugmentCardProps {
  augment: Augment;
}

function AugmentCard({augment}: AugmentCardProps) {
  const { icon, name, description, tier2 } = augment;

  return (
    <div
      className={` tier-${tier2} flex w-90 p-4 gap-4 text-sm bg-gray-900 rounded-lg`}
    >
      <div className="flex items-center justify-center flex-col gap-2">
        <Image src={icon} alt={name} width={64} height={64} className="max-w-none"/>
        <span className="tier-color">{tier2}</span>
      </div>
      <div className="flex flex-col gap-2">
        <h3>{name}</h3>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </div>
  );
}

interface AugsListProps {
  augments: Augment[]; 
}

export default function AugsList({ augments }: AugsListProps) {
  // Bỏ logic lọc
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-5 mt-5">
      {augments.map((augment) => (
        <AugmentCard key={augment.id} augment={augment} />
      ))}
    </div>
  );
}
