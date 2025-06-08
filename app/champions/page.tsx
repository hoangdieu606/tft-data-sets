import PageMenu from "@/components/PageMenu";
import ChampionList from "@/components/ChampionList";
import { DataFetcher } from "@/lib/data";
import Title from "@/components/Title";
import type { Metadata } from "next";
import { metadata } from "../layout";
import { getMetadataContent } from "@/lib/metadataContent";
import { DataPageKeys } from "@/lib/dataFilter";

export async function generateMetadata(): Promise<Metadata> {
  const data = await DataFetcher("champions");

  if (!data || !("set" in data) || !("version" in data)) {
    return metadata
  }

  const set = data.set;
  const patch = data.version ;
  const { title, desc } = getMetadataContent("champions" as DataPageKeys, set, patch);

  return {
    title,
    description: desc,
  };
}

export default async function ChampionsPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const dataChampions = await DataFetcher("champions");
  const dataTraits = await DataFetcher("traits");
  const resolvedSearchParams = await searchParams;
  const type = resolvedSearchParams.type ?? "Show All";

  if (
    !dataChampions ||
    !dataTraits ||
    !("data" in dataChampions) ||
    !("data" in dataTraits)
  ) {
    return (
      <div className="container mt-8 px-4 py-8 text-center text-red-500">
        <p>Không thể tải dữ liệu tướng hoặc tộc hệ. Vui lòng thử lại sau!</p>
      </div>
    );
  }

  const champions = dataChampions.data || [];
  const traits = dataTraits.data || [];

  return (
    <div className="container mt-8 px-4 py-8">
      <Title
        page="champions"
        set={dataChampions.set}
        patch={dataChampions.version}
      />
      <PageMenu page="champions" filterType={type} />
      <ChampionList champions={champions} traits={traits} filterType = {type} />
    </div>
  );
}
