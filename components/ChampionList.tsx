import Image from "next/image";
import { Champion, Trait } from "@/lib/types";
import {
  dataMapping,
  DataMappingKeys,
  DataMappingValue,
} from "@/lib/dataFilter";

interface ChampionCardProps {
  champion: Champion;
  traitMap: Map<string, { name: string; icon: string }>;
}

function ChampionCard({ champion, traitMap }: ChampionCardProps) {
  const {
    name,
    icon,
    abilityIcon,
    cost,
    traits,
    ability,
    abilityName,
    apiName,
    stats,
  } = champion;
  const mana = `${stats.initialMana} / ${stats.mana}`;
  const champTraits = traits.map(
    (id) => traitMap.get(id) || { name: "", icon: "" }
  );

  return (
    <div
      className={`champ-cost-${cost} flex flex-col bg-[#1e1e1e] text-white rounded-lg w-full sm:w-72 min-h-110 overflow-hidden`}
      aria-labelledby={`champ-${apiName}`}
    >
      <div className="p-4">
        <div className="champ-bg flex justify-between items-center p-3 -m-4 mb-4">
          <h3 className="text-base">{name}</h3>
          <span className="flex items-center text-lg font-semibold gap-1">
            {cost}
            <Image
              src="/assets/images/gold.png"
              alt="gold icon"
              width={20}
              height={20}
            />
          </span>
        </div>
        <div className="flex justify-between">
          <Image
            src={icon}
            alt={name}
            width={70}
            height={70}
            className="champ-border rounded-[10px]"
          />
          <div className="flex flex-col gap-1">
            {champTraits.map((trait) => (
              <span
                key={trait.name}
                className="flex items-center gap-[5px] text-sm"
              >
                {trait.icon && (
                  <Image
                    src={trait.icon}
                    alt={trait.name}
                    width={18}
                    height={18}
                  />
                )}
                {trait.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col p-4 gap-2">
        <div className="flex items-center my-[15px] gap-[15px]">
          <div className="w-[40px] h-[40px] rounded-[10px] overflow-hidden">
            <Image
              src={abilityIcon || icon}
              alt={abilityName}
              width={40}
              height={40}
            />
          </div>
          <div>
            <h4 className="text-sm">{abilityName}</h4>
            <p className="flex items-center gap-[5px] mt-[4px]">
              <Image
                src="/assets/images/Mana.png"
                alt="mana"
                width={20}
                height={20}
              />
              {mana}
            </p>
          </div>
        </div>
        <div>
          <p dangerouslySetInnerHTML={{ __html: ability }} />
        </div>
      </div>
    </div>
  );
}

interface ChampionListProps {
  champions: Champion[];
  traits: Trait[] | null;
  filterType: string;
}

export default function ChampionList({
  champions,
  traits,
  filterType,
}: ChampionListProps) {
  const typeFilter: DataMappingValue | string =
    filterType in dataMapping
      ? dataMapping[filterType as DataMappingKeys]
      : filterType;
  const championList =
    filterType === "Show All"
      ? champions
      : champions.filter((c) => c.cost === typeFilter);

  const traitMap = new Map<string, { name: string; icon: string }>(
    traits?.map((trait) => [
      trait.id,
      { name: trait.name, icon: trait.icon },
    ]) || []
  );

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-4 mt-4">
      {championList.map((champion) => (
        <ChampionCard
          key={champion.apiName}
          champion={champion}
          traitMap={traitMap}
        />
      ))}
    </div>
  );
}
