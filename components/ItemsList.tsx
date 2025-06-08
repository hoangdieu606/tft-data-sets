import Image from "next/image";
import clsx from "clsx";
import { Item } from "@/lib/types";
import {
  dataMapping,
  DataMappingKeys,
  DataMappingValue,
} from "@/lib/dataFilter";


interface ItemCardProps {
  item: Item;
  items: Item[];
}

function ItemCard({ item, items }: ItemCardProps) {
  const { name, icon, type, description, tier, composition } = item;

  const itemComps = composition?.length
    ? composition
        .map((compoApi) => items.find((i) => i.apiName === compoApi))
        .filter((comp): comp is Item => !!comp)
    : [];

  return (
    <div className={`tier-${tier} flex w-90 p-4 gap-4 bg-gray-900 rounded-lg`}>
      <div className="flex flex-col items-center gap-2 justify-around">
        <Image
          src={icon}
          alt={name}
          width={44}
          height={44}
          className={clsx(
            "rounded-lg max-w-none",
            type === "craftables" && "border border-[var(--tier-color)]"
          )}
        />
        <span className="tier-color">{tier}</span>
        {itemComps.length > 0 && (
          <span className="flex flex-col items-center p-1 gap-1 bg-white/10">
            <span>
              <Image
                src={itemComps[0].icon}
                alt={itemComps[0].name}
                width={24}
                height={24}
                className="max-w-none"
              />
            </span>
            <span>+</span>
            <span>
              <Image
                src={itemComps[1].icon}
                alt={itemComps[1].name}
                width={24}
                height={24}
              />
            </span>
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <div>
            <h3>{name}</h3>
          </div>
          <span className="flex items-center flex-wrap gap-1">stats</span>
        </div>
        <p dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </div>
  );
}

interface ItemListProps {
  items: Item[];
  filterType: string;
}

export default function ItemsList({ items, filterType }: ItemListProps) {
  const typeFilter: DataMappingValue | string =
    filterType in dataMapping
      ? dataMapping[filterType as DataMappingKeys]
      : filterType;

  const itemsList =
    filterType === "Show All"
      ? items
      : items.filter((item) => item.type === typeFilter);

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-5 mt-5">
      {itemsList.map((item) => (
        <ItemCard key={item.id} item={item} items={items} />
      ))}
    </div>
  );
}
