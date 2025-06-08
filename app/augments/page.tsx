import { DataFetcher } from "@/lib/data";
import Title from "@/components/Title";
import type { Metadata } from "next";
import { metadata } from "../layout";
import { getMetadataContent } from "@/lib/metadataContent";
import { DataPageKeys } from "@/lib/dataFilter";
import AugmentsDisplay from "@/components/AugmentsDisplay";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const data = await DataFetcher("augments");

  if (!data || !("set" in data) || !("version" in data)) {
    return metadata;
  }

  const set = data.set;
  const patch = data.version;
  const { title, desc } = getMetadataContent(
    "augments" as DataPageKeys,
    set,
    patch
  );

  return {
    title,
    description: desc,
  };
}

export default async function AugsPage() {
  const mainData = await DataFetcher("augments");

  if (!mainData || !("data" in mainData)) {
    return (
      <div className="container mt-8 px-4 py-8 text-center text-red-500">
        <p>Không thể tải dữ liệu tướng hoặc tộc hệ. Vui lòng thử lại sau!</p>
      </div>
    );
  }

  const augments = mainData.data || [];
  return (
    <div className="container mt-8 px-4 py-8">
      <Title page="augments" set={mainData.set} patch={mainData.version} />
      <Suspense fallback={<div>Đang tải dữ liệu...</div>}>
        <AugmentsDisplay augments={augments} />
      </Suspense>
    </div>
  );
}
