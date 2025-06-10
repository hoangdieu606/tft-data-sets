"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { capitalize } from "lodash";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useRouter, useSearchParams } from "next/navigation";
import { dataFilter, DataPageKeys } from "@/lib/dataFilter";

interface Props {
  page: DataPageKeys;
  filterType?: string;
}

export default function PageMenu({ page, filterType = "Show All" }: Props) {
  const { linkList, filterList } = dataFilter(page);
  const [isLinkOpen, setIsLinkOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleLink = () => setIsLinkOpen(!isLinkOpen);
  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  const router = useRouter();
  const params = useSearchParams();

  const handleFilterClick = (type: string) => {
    const newParams = new URLSearchParams(params);
    if (type === "Show All") {
      newParams.delete("type");
    } else {
      newParams.set("type", type);
    }
    router.push(`?${newParams.toString()}`);
    setIsFilterOpen(false);
  };

  return (
    <div className="flex justify-between gap-4 w-full">
      <div className="relative min-w-[160px]">
        <button
          className="w-full flex justify-between items-center px-5 py-3 border-2 border-[#184925] rounded-[20px] bg-[#0f1510] cursor-pointer hover:border-[#16dc4c] transition-all duration-300"
          onClick={toggleLink}
          aria-expanded={isLinkOpen}
          aria-controls="menu-link"
        >
          {capitalize(page)}
          <ChevronDownIcon className="w-5 h-5" />
        </button>
        <div
          id="menu-link"
          className={clsx(
            "absolute top-[calc(100%+5px)] left-0 w-full bg-[#0f1510] border-2 border-[#184925] rounded-[10px] overflow-hidden z-[100] transition-all duration-300",
            isLinkOpen
              ? "opacity-100 visible transform translate-y-0"
              : "opacity-0 invisible transform -translate-y-2.5"
          )}
        >
          {linkList.map((option, index) => (
            <Link
              key={index}
              href={option.href || "#"}
              className={clsx(
                "block px-5 py-2.5 text-white hover:bg-[#16dc4c] hover:text-black transition-all duration-300",
                filterType === option.text && "bg-[#16dc4c] text-black"
              )}
              onClick={() => setIsLinkOpen(false)}
            >
              {option.text}
            </Link>
          ))}
        </div>
      </div>

      <div className="relative min-w-[160px]">
        <button
          className="w-full flex justify-between items-center px-5 py-3 border-2 border-[#184925] rounded-[20px] bg-[#0f1510] cursor-pointer hover:border-[#16dc4c] transition-all duration-300"
          onClick={toggleFilter}
          aria-expanded={isFilterOpen}
          aria-controls="menu-filter"
        >
          {filterType}
          <ChevronDownIcon className="w-5 h-5" />
        </button>
        <div
          id="menu-filter"
          className={clsx(
            "absolute top-[calc(100%+5px)] left-0 w-full bg-[#0f1510] border-2 border-[#184925] rounded-[10px] overflow-hidden z-[100] transition-all duration-300",
            isFilterOpen
              ? "opacity-100 visible transform translate-y-0"
              : "opacity-0 invisible transform -translate-y-2.5"
          )}
        >
          {filterList.map((filterText, index) => (
            <button
              key={index}
              className={clsx(
                "w-full flex items-center px-5 py-2.5 text-white hover:bg-[#16dc4c] hover:text-black transition-all duration-300",
                filterType === filterText && "bg-[#16dc4c] text-black"
              )}
              onClick={() => handleFilterClick(filterText)}
            >
              <span>{filterText}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
