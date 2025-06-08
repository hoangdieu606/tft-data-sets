import Image from "next/image";
import clsx from "clsx";
import { Champion, Trait } from "@/lib/types";

interface TraitCardProps {
  trait: Trait;
  champions: Champion[];
}

function TraitCard({ trait, champions }: TraitCardProps) {
  const { icon, name, id, description, effects, type } = trait;
  const traitChampions = champions.filter((champ) => champ.traits.includes(id));

  return (
    <div
      className={`trait-${type} bg-stone-900 rounded-lg w-full sm:w-72 min-h-110 overflow-hidden`}
    >
      <div className="p-4">
        <div
          className={clsx(
            "flex justify-start items-center gap-2 text-gray-900 p-2 -m-4 mb-4",
            type === "origin" ? "bg-yellow-300" : "bg-pink-400"
          )}
        >
          <Image
            src={icon}
            alt={name}
            width={30}
            height={30}
            className="filter brightness-[0.1] invert-0"
          />
          <h3>{name}</h3>
        </div>
        <ul className="flex flex-wrap gap-2 min-h-15">
          {traitChampions.length > 0
            ? traitChampions.map((champ) => (
                <li key={champ.apiName} className={`champ-cost-${champ.cost}`}>
                  <Image
                    src={champ.icon}
                    alt={champ.name}
                    width={44}
                    height={44}
                    data-api-name={champ.apiName}
                    className="champ-border rounded-lg"
                  />
                </li>
              ))
            : null}
        </ul>
      </div>
      <div className="p-4 text-sm">
        <p className="my-5" dangerouslySetInnerHTML={{ __html: description }} />
        <ul className="flex flex-col">
          {Object.entries(effects).length > 0
            ? Object.entries(effects).map(([key, value]) => (
                <li key={key}>
                  {key}: <span dangerouslySetInnerHTML={{ __html: value }} />
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
}

interface TraitListProps {
  traits: Trait[];
  champions: Champion[];
}

export default function TraitList({ traits, champions }: TraitListProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(288px,1fr))] gap-5 mt-5">
      {traits.map((trait) => (
        <TraitCard key={trait.id} trait={trait} champions={champions} />
      ))}
    </div>
  );
}
