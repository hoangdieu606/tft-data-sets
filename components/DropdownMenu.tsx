"use client";

import { useState } from "react";
import clsx from "clsx";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

interface Option {
  text: string;
  href?: string;
  page?: string;
  icon?: string;
}

interface DropdownMenuProps {
  options: Option[];
  selected: string;
  onSelect: (option: Option) => void;
  id: string;
}

export function DropdownMenu({
  options,
  selected,
  onSelect,
  id,
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);
  const handleSelect = (option: Option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative min-w-[160px]">
      <button
        className="w-full flex justify-between items-center px-5 py-3 border-2 border-[#184925] rounded-[20px] bg-[#0f1510] text-white text-base cursor-pointer hover:border-[#16dc4c] transition-all duration-300"
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-controls={`${id}-menu`}
      >
        {selected}
        <ChevronDownIcon className="w-5 h-5" />
      </button>
      <div
        id={`${id}-menu`}
        className={clsx(
          "absolute top-[calc(100%+5px)] left-0 w-full bg-[#0f1510] border-2 border-[#184925] rounded-[10px] overflow-hidden z-[10] transition-all duration-300",
          isOpen ? "opacity-100 visible transform translate-y-0" : "opacity-0 invisible transform -translate-y-2.5"
        )}
      >
        {options.map((option) => (
          option.href ? (
            <Link
              key={option.text}
              href={option.href}
              className={clsx(
                "block px-5 py-2.5 text-white hover:bg-[#16dc4c] hover:text-black transition-all duration-300",
                selected === option.text && "bg-[#16dc4c] text-black"
              )}
              onClick={() => handleSelect(option)}
            >
              {option.text}
            </Link>
          ) : (
            <button
              key={option.text}
              className={clsx(
                "w-full flex items-center px-5 py-2.5 text-white hover:bg-[#16dc4c] hover:text-black transition-all duration-300",
                selected === option.text && "bg-[#16dc4c] text-black"
              )}
              onClick={() => handleSelect(option)}
            >
              <span>{option.text}</span>
              {option.icon && (
                <Image src={option.icon} alt="icon" width={14} height={14} className="ml-2" />
              )}
            </button>
          )
        ))}
      </div>
    </div>
  );
}