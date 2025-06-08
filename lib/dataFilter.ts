const dataLinks = [
  { text: "Tướng", href: "/champions" },
  { text: "Tộc Hệ", href: "/traits" },
  { text: "Nâng Cấp", href: "/augments" },
  { text: "Trang Bị", href: "/items" },
];

/* const guideLinks = [
  { text: "Tierlist", href: "/tierlist" },
  { text: "Nâng Cấp", href: "/tierlist-augments" },
  { text: "Trang Bị", href: "/tierlist-items" },
]; */

const dataPage = {
  champions: {
    linkList: dataLinks,
    filterList: [
      "Show All",
      "1 Cost",
      "2 Costs",
      "3 Costs",
      "4 Costs",
      "5 Costs",
    ],
  },
  traits: {
    linkList: dataLinks,
    filterList: ["Show All", "Tộc", "Hệ"],
  },
  augments: {
    linkList: dataLinks,
    filterList: ["Show All", "Kim Cương", "Vàng", "Bạc"],
  },
  items: {
    linkList: dataLinks,
    filterList: [
      "Show All",
      "Thường",
      "Ánh Sáng",
      "Tạo Tác",
      "Hỗ Trợ",
      "Ấn",
      "Set Items",
      "Components",
    ],
  },
};

export const dataMapping = {
  "Show All": "Show All",
  "1 Cost": 1,
  "2 Costs": 2,
  "3 Costs": 3,
  "4 Costs": 4,
  "5 Costs": 5,
  Tộc: "origin",
  Hệ: "class",
  "Kim Cương": "prism",
  Vàng: "gold",
  Bạc: "silver",
  Thường: "craftables",
  "Ánh Sáng": "radiants",
  "Tạo Tác": "ornns",
  "Hỗ Trợ": "supports",
  Ấn: "emblems",
  "Set Items": "set_items",
  Components: "components",
} as const;

export type DataMappingKeys = keyof typeof dataMapping;
export type DataMappingValue = (typeof dataMapping)[DataMappingKeys];

// Định nghĩa và xuất kiểu DataPageKeys
export type DataPageKeys = keyof typeof dataPage;

// Hàm dataFilter
export function dataFilter(page: DataPageKeys) {
  const { linkList, filterList } = dataPage[page];
  return { linkList, filterList };
}
