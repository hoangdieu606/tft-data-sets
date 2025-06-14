"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Guide, Champion, Item, Augment } from "@/lib/types";
import Hexagon from "@/components/comps/Hexagon";
import clsx from "clsx";

export default function TierItem({
  guide,
  championsMap,
  itemsMap,
  augmentsMap,
}: {
  guide: Guide;
  championsMap: Record<string, Champion>;
  itemsMap: Record<string, Item>;
  augmentsMap: Record<string, Augment>;
}) {
  const { mainChampion, mainItem, mainAugment, tier, title, compSlug } = guide;
  const router = useRouter();
  const pathname = usePathname();

  const iconChamp = mainChampion?.apiName && championsMap[mainChampion.apiName]?.icon
    ? championsMap[mainChampion.apiName].icon
    : "/assets/images/placeholder.webp";
  const costChamp = mainChampion?.apiName && championsMap[mainChampion.apiName]?.cost
    ? championsMap[mainChampion.apiName].cost
    : 0;
  const iconItem = mainItem?.apiName && itemsMap[mainItem.apiName]?.icon
    ? itemsMap[mainItem.apiName].icon
    : null;
  const nameItem = mainItem?.apiName && itemsMap[mainItem.apiName]?.name
    ? itemsMap[mainItem.apiName].name
    : null;
  const iconAugment = mainAugment?.apiName && augmentsMap[mainAugment.apiName]?.icon
    ? augmentsMap[mainAugment.apiName].icon
    : null;
  const tierAugment = mainAugment?.apiName && augmentsMap[mainAugment.apiName]?.tier2
    ? augmentsMap[mainAugment.apiName].tier2
    : null;
  const nameAugment = mainAugment?.apiName && augmentsMap[mainAugment.apiName]?.name
    ? augmentsMap[mainAugment.apiName].name
    : null;

  const isDetailPage = pathname === `/tierlist/${compSlug}`;
  
  const handleClick = (e: React.MouseEvent) => {
    if (isDetailPage) {
      e.preventDefault();
      router.push("/tierlist"); // Quay về trang tier list
    }
    // Nếu không phải trang chi tiết, <Link> sẽ xử lý điều hướng bình thường
  };

  return (
    <div
      className={clsx(
        "tier-list w-[90px] transition-transform duration-300 hover:-translate-y-2",
        `champ-cost-${costChamp}`,
        "relative",
        isDetailPage &&
          "[filter:drop-shadow(0_0_10px_var(--border-color-cost))_drop-shadow(0_0_20px_var(--border-color-cost))]"
      )}
    >
      {tier === "X" && tierAugment && (
        <div
          className={`tier-${tierAugment} absolute w-[30px] h-[30px] z-20 right-[10px] -top-[5px] flex justify-center items-center bg-[var(--tier-color)] rounded-[50%]`}
        >
          {tierAugment}
        </div>
      )}
      <div className={`flex relative w-[90px]`}>
        <div>
          <Link
            href={`/tierlist/${compSlug}`}
            aria-label={`View details for ${title}`}
            onClick={handleClick}
          >
            <Hexagon
              iconSize={90}
              imageSrc={iconChamp}
              name={title}
            />
          </Link>
        </div>
        {iconAugment && nameAugment && (
          <div className="flex absolute top-[70px] left-2/4 -translate-x-1/2 m-auto">
            <Hexagon
              iconSize={27}
              imageSrc={iconAugment}
              name={nameAugment}
              classNameImage="bg-black"
            />
          </div>
        )}
        {iconItem && nameItem && (
          <div className="flex absolute top-[70px] left-2/4 -translate-x-1/2 m-auto">
            <Hexagon
              iconSize={27}
              imageSrc={iconItem}
              name={nameItem}
            />
          </div>
        )}
      </div>
      <div className="hexagon-title flex justify-center text-center text-xs mt-2.5">
        {title}
      </div>
    </div>
  );
}