// app/items/ItemsDisplay.tsx

"use client";

import { useSearchParams } from "next/navigation";
import PageMenu from "@/components/PageMenu";
import ItemsList from "@/components/ItemsList";
import { Item } from "@/lib/types";
import { dataMapping, DataMappingKeys, DataMappingValue } from "@/lib/dataFilter";

interface ItemsDisplayProps {
  items: Item[];
}

export default function ItemsDisplay({ items }: ItemsDisplayProps) {
  const searchParams = useSearchParams();
  const filterType = searchParams.get('type') ?? "Show All";

  const typeFilter: DataMappingValue | string =
    filterType in dataMapping
      ? dataMapping[filterType as DataMappingKeys]
      : filterType;

  const filteredItems =
    filterType === "Show All"
      ? items
      : items.filter((item) => item.type === typeFilter);

  return (
    <>
      <PageMenu page="items" filterType={filterType} />
      {/* Truyền cả danh sách đã lọc và danh sách đầy đủ */}
      <ItemsList items={filteredItems} allItems={items} />
    </>
  );
}