import { Champion, Trait } from "@/lib/types";
import { traitCardListStyles } from "@/lib/allCardStyles";
import TraitCard from "./TraitCard";

interface TraitListProps {
  traits: Trait[];
  champions: Champion[];
}

export default function TraitList({ traits, champions }: TraitListProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(288px,1fr))] gap-5 mt-5">
      {traits.map((trait) => (
        <TraitCard
          key={trait.id}
          trait={trait}
          champions={champions}
          traits={traits}
          isToolTip={true}
          styles={traitCardListStyles}
        />
      ))}
    </div>
  );
}
