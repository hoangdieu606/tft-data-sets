"use client";

import { useEffect } from "react";

export default function ScrollToTier({ tier }: { tier: string }) {
  useEffect(() => {
    const section = document.getElementById(`tier-${tier}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [tier]); // Chạy lại khi tier thay đổi

  return null; // Không render gì
}