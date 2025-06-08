// app/traits/TraitsDisplay.tsx

"use client";

import { useSearchParams } from "next/navigation";
import PageMenu from "@/components/PageMenu";
import TraitList from "@/components/TraitList";
import { Champion, Trait } from "@/lib/types";
import { dataMapping, DataMappingKeys, DataMappingValue } from "@/lib/dataFilter";

interface TraitsDisplayProps {
  traits: Trait[];
  champions: Champion[];
}

export default function TraitsDisplay({ traits, champions }: TraitsDisplayProps) {
  const searchParams = useSearchParams();
  const filterType = searchParams.get('type') ?? "Show All";

  // Logic lọc tộc/hệ
  const typeFilter: DataMappingValue | string =
    filterType in dataMapping
      ? dataMapping[filterType as DataMappingKeys]
      : filterType;

  const filteredTraits =
    filterType === "Show All"
      ? traits
      : traits.filter((trait) => trait.type === typeFilter);

  return (
    <>
      <PageMenu page="traits" filterType={filterType} />
      <TraitList traits={filteredTraits} champions={champions} />
    </>
  );
}