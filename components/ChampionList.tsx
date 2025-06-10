import { Champion, Trait } from "@/lib/types";
import { ChampionCard } from "./ChampionCard";
import { championCardListStyles } from "@/lib/allCardStyles";

interface ChampionListProps {
  champions: Champion[];
  traits: Trait[] | null;
}

export default function ChampionList({ champions, traits }: ChampionListProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-4 mt-4">
      {champions.map((champion) => (
        <ChampionCard
          key={champion.id}
          champion={champion}
          traits={traits || []}
          styles={championCardListStyles}
        />
      ))}
    </div>
  );
}