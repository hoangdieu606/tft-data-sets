"use client";

import { useSearchParams } from "next/navigation";
import PageMenu from "@/components/PageMenu";
import {
  dataMapping,
  DataMappingKeys,
  DataMappingValue,
} from "@/lib/dataFilter";

import { Augment, TierAugmentsGroup } from "@/lib/types";
import TierAugmentsSection from "./TierAugmentsSection";

interface TierAugmentsDisplayProps {
  augments: Augment[];
}
export default function TierAugmentsDisplay({
  augments,
}: TierAugmentsDisplayProps) {
  const searchParams = useSearchParams();
  const filterType = searchParams.get("type") ?? "Show All";

  const typeFilter: DataMappingValue | string =
    filterType in dataMapping
      ? dataMapping[filterType as DataMappingKeys]
      : filterType;

  const filteredGuides =
    filterType === "Show All"
      ? augments
      : augments.filter((augment) => augment.tier === typeFilter);

  const tierGroups = filteredGuides.reduce(
    (acc: TierAugmentsGroup, augment: Augment) => {
      if (augment.tier2) {
        acc[augment.tier2 as keyof TierAugmentsGroup].push(augment);
      }
      return acc;
    },
    { S: [], A: [], B: [], C: [] }
  );

  return (
    <>
      <PageMenu page="tierlist-augments" filterType={filterType} />
      <div
        className="tier-comp-container flex flex-col gap-5"
        role="navigation"
      >
        {(["S", "A", "B", "C"] as const).map(
          (tier) =>
            tierGroups[tier].length > 0 && (
              <TierAugmentsSection
                key={tier}
                tier={tier}
                augments={tierGroups[tier]}
              />
            )
        )}
      </div>
    </>
  );
}
