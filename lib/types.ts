export interface Champion {
  apiName: string;
  name: string;
  id: string;
  icon: string;
  abilityIcon: string;
  ability: string;
  abilityName: string;
  cost: number;
  hexIndex: string;
  traits: string[];
  stats: ChampionStats;
}

export interface ChampionStats {
  ap: number;
  ar: number;
  as: number;
  crit: number;
  ad: number;
  hp: number;
  initialMana: number;
  mr: number;
  mana: number;
  range: number;
}

export interface Trait {
  apiName: string;
  name: string;
  id: string;
  icon: string;
  description: string;
  effects: Record<string, string | number>;
  breakpoints: number[];
  colors: number[];
  rules: string[];
  type: string;
}

export interface Augment {
  apiName: string;
  id: string;
  name: string;
  icon: string;
  description: string;
  rules: string[];
  tier: string;
  tier2: string;
}

export interface Item {
  apiName: string;
  name: string;
  id: string;
  icon: string;
  description: string;
  composition: string[];
  rules: string[];
  stats: Record<string, string | number>;
  trait: string;
  type: string;
  unique: boolean;
  tier: string;
}

export interface Guide {
  [key: string]: unknown;
}