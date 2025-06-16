"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Dropdown from "./Dropdown";
import { dataFilter, DataPageKeys } from "@/lib/dataFilter";

interface Props {
  page: DataPageKeys;
  filterType: string;
}

export default function PageMenu({ page, filterType = "Show All" }: Props) {
  const { linkList, filterList } = dataFilter(page);
  const router = useRouter();
  const params = useSearchParams();

  const handleFilterClick = useCallback(
    (type: string) => {
      const newParams = new URLSearchParams(params.toString());
      if (type === "Show All") {
        newParams.delete("type");
      } else {
        newParams.set("type", type);
      }
      router.push(`?${newParams.toString()}`);
    },
    [params, router]
  );

  const mapping = {
    champions: "Tướng",
    traits: "Tộc Hệ",
    augments: "Nâng Cấp",
    items: "Trang Bị",
    "tierlist": "Đội Hình",
    "tierlist-augments": "Nâng Cấp",
    "tierlist-items": "Trang Bị",
  };

  return (
    <div className="flex justify-between gap-4 w-full">
      <Dropdown
        label={mapping[page]}
        options={linkList.map((option) => ({
          text: option.text,
          href: option.href,
        }))}
        selectedOption={page}
        type="link"
      />
      <Dropdown
        label={filterType}
        options={filterList.map((text) => ({
          text,
          onClick: () => handleFilterClick(text),
        }))}
        selectedOption={filterType}
        type="filter"
      />
    </div>
  );
}
