import PageMenu from "@/components/PageMenu";
import TraitList from "@/components/TraitList";
import { DataFetcher } from "@/lib/data";
import Title from "@/components/Title";
import type { Metadata } from "next";
import { metadata } from "../layout";
import { getMetadataContent } from "@/lib/metadataContent";
import { DataPageKeys } from "@/lib/dataFilter";

export async function generateMetadata(): Promise<Metadata> {
  const data = await DataFetcher("traits");

  if (!data || !("set" in data) || !("version" in data)) {
    return metadata
  }

  const set = data.set;
  const patch = data.version ;
  const { title, desc } = getMetadataContent("traits" as DataPageKeys, set, patch);

  return {
    title,
    description: desc,
  };
}

export default async function TraitsPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const mainData = await DataFetcher("traits");
  const dataChampions = await DataFetcher("champions");
  
  const resolvedSearchParams = await searchParams;
  const type = resolvedSearchParams.type ?? "Show All";

  if (
    !mainData ||
    !dataChampions ||
    !("data" in mainData) ||
    !("data" in dataChampions)
  ) {
    return (
      <div className="container mt-8 px-4 py-8 text-center text-red-500">
        <p>Không thể tải dữ liệu tướng hoặc tộc hệ. Vui lòng thử lại sau!</p>
      </div>
    );
  }

  const traits = mainData.data || [];
  const setNumber = mainData.set;
  const pathVersion = mainData.version;
  const champions = dataChampions.data || [];
  return (
    <div className="container mt-8 px-4 py-8">
      <Title
        page="traits"
        set={setNumber}
        patch={pathVersion}
      />
      <PageMenu page="traits" filterType={type} />
      <TraitList traits={traits} champions={champions} filterType = {type} />
    </div>
  );
}
