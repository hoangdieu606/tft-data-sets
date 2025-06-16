import { DataFetcher } from "@/lib/data";
import { Champion, Item, Augment, Guide } from "@/lib/types";
import keyBy from "lodash/keyBy";
import TierListDisplay from "@/components/comps/TierListDisplay";
import Title from "@/components/Title";
import { Suspense } from "react";

export async function generateMetadata() {
  return {
    title: "Tier List - Game Guides",
    description:
      "Explore the latest tier list for champions, items, and augments.",
  };
}

export default async function TierListPage() {
  const [guidesData, dataChampions, dataItems, dataAugments] =
    await Promise.all([
      DataFetcher("guides") as Promise<{ guides: Guide[] } | undefined>,
      DataFetcher("champions") as Promise<
        { data: Champion[]; set: string | number; version: string } | undefined
      >,
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

  const set = dataChampions.set;
  const patch = dataChampions.version;

  return (
    <>
      <Title page="tierlist" set={set} patch={patch} />
      <Suspense fallback={<div>Đang tải dữ liệu...</div>}>
        <TierListDisplay
          guides={guides}
          championsMap={championsMap}
          itemsMap={itemsMap}
          augmentsMap={augmentsMap}
        />
      </Suspense>
    </>
  );
}
