import Image from "next/image";
import clsx from "clsx";
import { Champion, Trait } from "@/lib/types";
import IconTooltip from "./IconTooltip";
import { ChampionCard } from "./ChampionCard";
import {
  championCardTooltipStyles,
  TraitCardStyles,
} from "@/lib/allCardStyles";

interface TraitCardProps {
  trait: Trait;
  champions: Champion[];
  traits: Trait[];
  isToolTip?: boolean;
  styles?: TraitCardStyles;
}

export default function TraitCard({
  trait,
  champions,
  traits,
  isToolTip = false,
  styles = {},
}: TraitCardProps) {
  const { icon, name, id, description, effects, type } = trait;
  const traitChampions = champions.filter((champ) => champ.traits.includes(id));
  return (
    <div className={`trait-${type} overflow-hidden ${styles.container}`}>
      <div
        className={clsx(
          "flex justify-start items-center gap-2 text-gray-900 p-2",
          type === "origin" ? "bg-yellow-300" : "bg-pink-400"
        )}
      >
        <Image
          src={icon}
          alt={name}
          width={styles.traitIconSize}
          height={styles.traitIconSize}
          className="filter brightness-[0.1] invert-0"
        />
        <h3 className={styles.nameText}>{name}</h3>
      </div>
      <div className={styles.padding}>
        <div className="flex flex-wrap gap-2 min-h-[60px]">
          {traitChampions.length > 0
            ? traitChampions.map((champ) =>
                isToolTip ? (
                  <IconTooltip
                    key={champ.id}
                    tooltipContent={
                      <ChampionCard
                        champion={champ}
                        traits={traits}
                        styles={championCardTooltipStyles}
                      />
                    }
                    className={`champ-cost-${champ.cost}`}
                  >
                    <Image
                      src={champ.icon}
                      alt={champ.name}
                      width={styles.champIconSize}
                      height={styles.champIconSize}
                      className="champ-border rounded-lg"
                    />
                  </IconTooltip>
                ) : (
                  <div key={champ.id} className={`champ-cost-${champ.cost}`}>
                    <Image
                      src={champ.icon}
                      alt={champ.name}
                      width={styles.champIconSize}
                      height={styles.champIconSize}
                      className="champ-border rounded-lg"
                    />
                  </div>
                )
              )
            : null}
        </div>
        <div>
          <p
            className="my-5"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <ul className="flex flex-col">
            {Object.entries(effects).length > 0
              ? Object.entries(effects).map(([key, value]) => (
                  <li key={key}>
                    {key}: <span dangerouslySetInnerHTML={{ __html: value }} />
                  </li>
                ))
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
}
