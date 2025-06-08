// app/champions/ChampionsDisplay.tsx

"use client"; // <-- Rất quan trọng!

import { useSearchParams } from "next/navigation";
import PageMenu from "@/components/PageMenu";
import ChampionList from "@/components/ChampionList";
import { Champion, Trait } from "@/lib/types";
import {
  dataMapping,
  DataMappingKeys,
  DataMappingValue,
} from "@/lib/dataFilter";

interface ChampionsDisplayProps {
  champions: Champion[];
  traits: Trait[];
}

export default function ChampionsDisplay({
  champions,
  traits,
}: ChampionsDisplayProps) {
  // Dùng hook của client để đọc search params
  const searchParams = useSearchParams();
  const filterType = searchParams.get("type") ?? "Show All";

  // Logic lọc giờ nằm ở đây
  const typeFilter: DataMappingValue | string =
    filterType in dataMapping
      ? dataMapping[filterType as DataMappingKeys]
      : filterType;

  const filteredChampions =
    filterType === "Show All"
      ? champions
      : champions.filter((c) => c.cost === typeFilter);

  return (
    <>
      <PageMenu page="champions" filterType={filterType} />
      {/* Truyền danh sách đã lọc vào ChampionList */}
      <ChampionList champions={filteredChampions} traits={traits} />
    </>
  );
}
