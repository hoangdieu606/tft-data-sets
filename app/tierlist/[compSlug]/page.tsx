import Image from "next/image";
import { notFound } from "next/navigation";
import { DataFetcher } from "@/lib/data";
import {
  Guide,
  Champion,
  Trait,
  Item,
  Augment,
  TierGroup,
  GenericDataResponse,
  GuidesDataResponse,
} from "@/lib/types";
import TierItem from "@/components/comps/TierItem";
import ScrollToTier from "@/components/comps/ScrollToTier";
import CompHead from "@/components/comps/CompHead";
import HexagonIcons from "@/components/comps/HexagonIcons";
import Hexagon from "@/components/comps/Hexagon";
import IconTooltip from "@/components/IconTooltip";
import ItemCard from "@/components/items/ItemCard";
import ChessBoard from "@/components/comps/ChessBoard";
import clsx from "clsx";
import keyBy from "lodash/keyBy";

// Component cho mỗi tier, tái sử dụng từ tierlist/page.tsx
function TierSection({
  tier,
  guides,
  championsMap,
  traitsMap,
  itemsMap,
  augmentsMap,
  setNumber,
  selectedGuide,
}: {
  tier: string;
  guides: Guide[];
  championsMap: Record<string, Champion>;
  traitsMap: Record<string, Trait>;
  itemsMap: Record<string, Item>;
  augmentsMap: Record<string, Augment>;
  setNumber: number;
  selectedGuide: Guide;
}) {
  const { finalComp, earlyComp, altBuilds, carousel, tips } = selectedGuide;
  return (
    <div
      id={`tier-${tier}`}
      className={`tier-${tier} flex flex-col gap-2.5 mt-10`}
    >
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
      {selectedGuide && selectedGuide.tier === tier && (
        <div className="w-full mx-[auto] my-4 p-4 md:p-8 overflow-hidden relative">
          <CompHead
            guide={selectedGuide}
            championsMap={championsMap}
            traitsMap={traitsMap}
            itemsMap={itemsMap}
            augmentsMap={augmentsMap}
            setNumber={setNumber}
          />
          <div className="flex flex-col border-t-2 border-t-green-900 md:border-2 md:border-green-900 py-8 gap-8 -mt-[2px]">
            <h2 className="uppercase text-center">Đội hình hoàn thiện</h2>
            <div className="flex flex-wrap justify-center items-center gap-6">
              {finalComp.map((obj) => (
                <HexagonIcons
                  key={obj.boardIndex}
                  championSize={100}
                  itemSize={30}
                  apiName={obj.apiName}
                  championsMap={championsMap}
                  items={obj.items}
                  itemsMap={itemsMap}
                  traitsMap={traitsMap}
                  stars={obj.stars}
                />
              ))}
            </div>
          </div>
          {/* 2 */}
          <div className="flex flex-col border-t-2 border-t-green-900 md:border-2 md:border-green-900 py-8 gap-8 -mt-[2px]">
            <h2 className="uppercase text-center">Đội hình đầu trận</h2>
            <div className="flex flex-wrap justify-center items-center gap-4">
              {earlyComp.map((obj) => (
                <HexagonIcons
                  key={obj.apiName}
                  championSize={72}
                  itemSize={24}
                  apiName={obj.apiName}
                  championsMap={championsMap}
                  items={obj.items}
                  itemsMap={itemsMap}
                  traitsMap={traitsMap}
                  stars={obj.stars}
                />
              ))}
            </div>
          </div>
          {/* 3 */}
          <div className="flex flex-col border-t-2 border-t-green-900 md:border-2 md:border-green-900 py-8 gap-8 -mt-[2px]">
            <h2 className="uppercase text-center">Ưu tiên trang bị</h2>
            <div className="flex flex-wrap justify-center items-center gap-4">
              {carousel.map((obj) => (
                <IconTooltip
                  key={obj.apiName}
                  tooltipContent={
                    <ItemCard
                      item={itemsMap[obj.apiName]}
                      itemsMap={itemsMap}
                    />
                  }
                >
                  <Hexagon
                    imageSrc={itemsMap[obj.apiName]?.icon}
                    iconSize={72}
                    name={itemsMap[obj.apiName]?.name}
                  />
                </IconTooltip>
              ))}
            </div>
          </div>
          {/* 4 */}
          {altBuilds?.length > 0 && (
            <div className="flex flex-col border-t-2 border-t-green-900 md:border-2 md:border-green-900 py-8 gap-8 -mt-[2px]">
              <h2 className="uppercase text-center">Tạo tác nếu có</h2>
              <div className="flex flex-wrap justify-center items-center gap-4">
                {altBuilds.map((obj, index) => (
                  <HexagonIcons
                    key={index}
                    championSize={100}
                    itemSize={30}
                    apiName={obj.apiName}
                    championsMap={championsMap}
                    items={obj.items}
                    itemsMap={itemsMap}
                    traitsMap={traitsMap}
                    stars={obj.stars}
                  />
                ))}
              </div>
            </div>
          )}
          {/* Đặt component HexagonIcons vào Chess Board ở đây*/}
          <div className="flex flex-col border-t-2 border-t-green-900 md:border-2 md:border-green-900 py-8 gap-8 -mt-[2px]">
            <h2 className="uppercase text-center">
              Bàn cờ đội hình hoàn thiện
            </h2>
            <ChessBoard
              finalComp={finalComp}
              championsMap={championsMap}
              itemsMap={itemsMap}
              traitsMap={traitsMap}
            />
          </div>

          {/* 6 */}
          <div className="flex flex-col border-t-2 border-t-green-900 md:border-2 md:border-green-900 py-8 gap-8 -mt-[2px]">
            <h2 className="uppercase text-center">Tips các giai đoạn</h2>
            <div className="flex flex-col md:flex-row md:px-8 gap-4">
              {tips.map((obj, index) => (
                <div
                  key={index}
                  className="flex flex-col px-6 py-4 border-2 border-green-900 rounded-4xl items-center gap-3 text-justify flex-[1]"
                >
                  <h3>{obj.stage}</h3>
                  <p>{obj.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface TierDetailPageProps {
  params: Promise<{ compSlug: string }>;
}

export async function generateMetadata({ params }: TierDetailPageProps) {
  const { compSlug } = await params;
  const guidesData = (await DataFetcher(
    "guides"
  )) as GuidesDataResponse<Guide> | null;
  const guide = guidesData?.guides.find((g) => g.compSlug === compSlug);

  return {
    title: guide?.title || `Tier List - ${compSlug}`,
    description: guide?.augmentsTip,
  };
}

export async function generateStaticParams() {
  const guidesData = (await DataFetcher(
    "guides"
  )) as GuidesDataResponse<Guide> | null;
  return (
    guidesData?.guides.map((guide) => ({
      compSlug: encodeURIComponent(guide.compSlug),
    })) || []
  );
}

export default async function TierDetailPage({ params }: TierDetailPageProps) {
  const { compSlug } = await params;

  const [guidesData, dataChampions, dataTraits, dataItems, dataAugments] =
    await Promise.all([
      DataFetcher("guides") as Promise<GuidesDataResponse<Guide> | null>,
      DataFetcher("champions") as Promise<GenericDataResponse<Champion> | null>,
      DataFetcher("traits") as Promise<GenericDataResponse<Trait> | null>,
      DataFetcher("items") as Promise<GenericDataResponse<Item> | null>,
      DataFetcher("augments") as Promise<GenericDataResponse<Augment> | null>,
    ]);

  if (
    !guidesData ||
    !guidesData.guides ||
    !dataChampions ||
    !dataTraits ||
    !dataItems ||
    !dataAugments
  ) {
    throw new Error("Không thể tải dữ liệu");
  }

  const guide = guidesData.guides.find((g) => g.compSlug === compSlug);
  if (!guide) {
    return notFound();
  }

  const championsMap = keyBy(dataChampions.data, "apiName");
  const setNumber =
    typeof dataChampions.set === "number"
      ? dataChampions.set
      : parseFloat(dataChampions.set as string) || 0;

  const traitsMap = keyBy(dataTraits.data, "apiName");
  const itemsMap = keyBy(dataItems.data, "apiName");
  const augmentsMap = keyBy(dataAugments.data, "apiName");

  const guides: Guide[] = guidesData.guides || [];
  const tierGroups = guides.reduce(
    (acc: TierGroup, g: Guide) => {
      acc[g.tier].push(g);
      return acc;
    },
    { S: [], A: [], B: [], C: [], X: [] }
  );

  return (
    <>
      <ScrollToTier tier={guide.tier} />
      <div
        className="tier-comp-container flex flex-col gap-5"
        role="navigation"
      >
        {(["S", "A", "B", "C", "X"] as const).map(
          (tier) =>
            tierGroups[tier].length > 0 && (
              <TierSection
                key={tier}
                tier={tier}
                guides={tierGroups[tier]}
                championsMap={championsMap}
                traitsMap={traitsMap}
                itemsMap={itemsMap}
                augmentsMap={augmentsMap}
                setNumber={setNumber}
                selectedGuide={guide}
              />
            )
        )}
      </div>
    </>
  );
}
