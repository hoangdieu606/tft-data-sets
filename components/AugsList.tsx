import Image from "next/image";
import {
  dataMapping,
  DataMappingKeys,
  DataMappingValue,
} from "@/lib/dataFilter";

interface Augment {
  apiName: string;
  id: string;
  name: string;
  icon: string;
  description: string;
  rules: string[];
  tier: string;
  tier2: string;
}
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
        <p dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </div>
  );
}

interface AugsListProps {
  augments: Augment[];
  filterType: string;
}

export default function AugsList({ augments, filterType }: AugsListProps) {
  const typeFilter: DataMappingValue | string =
    filterType in dataMapping
      ? dataMapping[filterType as DataMappingKeys]
      : filterType;

  const augmentsList =
    filterType === "Show All"
      ? augments
      : augments.filter((augment) => augment.tier === typeFilter);

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-5 mt-5">
      {augmentsList.map((augment) => (
        <AugmentCard key={augment.id} augment={augment} />
      ))}
    </div>
  );
}
