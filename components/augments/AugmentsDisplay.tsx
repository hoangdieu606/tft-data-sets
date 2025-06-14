"use client";

import { useSearchParams } from "next/navigation";
import PageMenu from "@/components/PageMenu";
import AugsList from "@/components/augments/AugsList";
import { Augment } from "@/lib/types";
import { dataMapping, DataMappingKeys, DataMappingValue } from "@/lib/dataFilter";

interface AugmentsDisplayProps {
  augments: Augment[];
}

export default function AugmentsDisplay({ augments }: AugmentsDisplayProps) {
  const searchParams = useSearchParams();
  const filterType = searchParams.get('type') ?? "Show All";

  const typeFilter: DataMappingValue | string =
    filterType in dataMapping
      ? dataMapping[filterType as DataMappingKeys]
      : filterType;

  const filteredAugments =
    filterType === "Show All"
      ? augments
      : augments.filter((augment) => augment.tier === typeFilter);

  return (
    <>
      <PageMenu page="augments" filterType={filterType} />
      <AugsList augments={filteredAugments} />
    </>
  );
}