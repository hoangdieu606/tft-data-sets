import Image from "next/image";
import { DataFetcher } from "@/lib/data";
import { Champion, Item, Augment, Guide, TierGroup } from "@/lib/types";
import TierItem from "@/components/comps/TierItem"; // Import TierItem mới
import clsx from "clsx";
import keyBy from "lodash/keyBy";

// Component cho mỗi tier
function TierSection({
  tier,
  guides,
  championsMap,
  itemsMap,
  augmentsMap,
}: {
  tier: "S" | "A" | "B" | "C" | "X";
  guides: Guide[];
  championsMap: Record<string, Champion>;
  itemsMap: Record<string, Item>;
  augmentsMap: Record<string, Augment>;
}) {
  return (
    <div className={`tier-${tier} flex flex-col gap-2.5 mt-10`}>
      <div className="comp-list flex flex-col items-center gap-3 lg:flex-row">
        <div className="w-full h-14 flex relative bg-[image:var(--tier-image)] lg:w-[130px] lg:h-[130px]">
          <Image
            src={`/assets/images/${tier}-Tier.webp`}
            alt={`Tier ${tier} icon for ranking`}
            width={130}
            height={130}
            priority
            className="hidden lg:flex w-[130px] h-[130px] object-cover"
          />
          <Image
            src={`/assets/images/${tier}-Tier-Wide.webp`}
            alt={`Wide Tier ${tier} icon for mobile`}
            width={160}
            height={46}
            className="flex lg:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <Image
            src={`/assets/images/${tier}-Tier-Texture.webp`}
            alt={`Tier ${tier} texture background`}
            width={444}
            height={56}
            className="lg:hidden object-cover w-full"
          />
        </div>
        <div
          className={clsx(
            `tier-group flex-1 bg-[#0f1510] relative shadow-[15px_12px_20px_#061b1266] w-full min-h-[132px] grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] justify-items-center rounded-3xl p-4 gap-2.5 before:content-[''] before:absolute before:-top-[1.5px] before:-left-[1.5px] before:-right-[1.5px] before:bottom-[2px] before:-z-[5] before:pointer-events-none before:[border-radius:inherit] before:bg-[linear-gradient(to_bottom,var(--tier-bg),transparent)]`,
            tier === "X" && "pt-8 mt-4 lg:mt-0"
          )}
        >
          {tier === "X" && (
            <div className="absolute left-2/4 -translate-x-1/2 -top-[15px] text-[rgb(0,_0,_0)] font-semibold bg-[image:var(--tier-image)] rounded-[12px] px-[15px] py-[3px]">
              Hero Tier
            </div>
          )}
          {guides.map((guide, id) => (
            <TierItem
              key={id}
              guide={guide}
              championsMap={championsMap}
              itemsMap={itemsMap}
              augmentsMap={augmentsMap}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: "Tier List - Game Guides",
    description:
      "Explore the latest tier list for champions, items, and augments.",
  };
}

export const revalidate = 43200; // Revalidate sau 12 giờ

export default async function TierListPage() {
  const [guidesData, dataChampions, dataItems, dataAugments] =
    await Promise.all([
      DataFetcher("guides") as Promise<{ guides: Guide[] } | undefined>,
      DataFetcher("champions") as Promise<{ data: Champion[] } | undefined>,
      DataFetcher("items") as Promise<{ data: Item[] } | undefined>,
      DataFetcher("augments") as Promise<{ data: Augment[] } | undefined>,
    ]);

  if (
    !guidesData ||
    !guidesData.guides ||
    !dataChampions ||
    !dataItems ||
    !dataAugments
  ) {
    throw new Error("Không thể tải dữ liệu tier list");
  }

  const guides: Guide[] = guidesData.guides || [];
  const champions: Champion[] = dataChampions.data || [];
  const items: Item[] = dataItems.data || [];
  const augments: Augment[] = dataAugments.data || [];

  const championsMap = keyBy(champions, "apiName");
  const itemsMap = keyBy(items, "apiName");
  const augmentsMap = keyBy(augments, "apiName");

  /* guides.forEach((guide) => {
    if (
      guide.mainChampion?.apiName &&
      !championsMap[guide.mainChampion.apiName]
    ) {
      console.warn(
        `Champion ${guide.mainChampion.apiName} not found in championsMap`
      );
    }
    if (guide.mainItem?.apiName && !itemsMap[guide.mainItem.apiName]) {
      console.warn(`Item ${guide.mainItem.apiName} not found in itemsMap`);
    }
    if (guide.mainAugment?.apiName && !augmentsMap[guide.mainAugment.apiName]) {
      console.warn(
        `Augment ${guide.mainAugment.apiName} not found in augmentsMap`
      );
    }
  }); */

  const tierGroups = guides.reduce(
    (acc: TierGroup, guide: Guide) => {
      acc[guide.tier].push(guide);
      return acc;
    },
    { S: [], A: [], B: [], C: [], X: [] }
  );

  return (
    <div className="tier-comp-container flex flex-col gap-5" role="navigation">
      {(["S", "A", "B", "C", "X"] as const).map(
        (tier) =>
          tierGroups[tier].length > 0 && (
            <TierSection
              key={tier}
              tier={tier}
              guides={tierGroups[tier]}
              championsMap={championsMap}
              itemsMap={itemsMap}
              augmentsMap={augmentsMap}
            />
          )
      )}
    </div>
  );
}
