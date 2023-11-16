export interface PokemonData {
  data: Datum[]
  page: number
  pageSize: number
  count: number
  totalCount: number
}

export interface Datum {
  id: string
  name: string
  supertype: Supertype
  subtypes: Subtype[]
  hp: string
  types: RetreatCost[]
  evolvesFrom?: string
  attacks?: Attack[]
  weaknesses?: Resistance[]
  resistances?: Resistance[]
  retreatCost?: RetreatCost[]
  convertedRetreatCost?: number
  set: Set
  number: string
  artist: string
  rarity?: Rarity
  flavorText?: string
  nationalPokedexNumbers: number[]
  legalities: Legalities
  images: DatumImages
  tcgplayer?: Tcgplayer
  cardmarket?: Cardmarket
  evolvesTo?: string[]
  level?: string
  abilities?: Ability[]
  rules?: string[]
  regulationMark?: string
}

export interface Ability {
  name: string
  text: string
  type: Type
}

export enum Type {
  Ability = 'Ability',
  PokéBody = 'Poké-Body',
  PokéPower = 'Poké-Power',
  PokémonPower = 'Pokémon Power',
}

export interface Attack {
  name: string
  cost: RetreatCost[]
  convertedEnergyCost: number
  damage: string
  text: string
}

export enum RetreatCost {
  Colorless = 'Colorless',
  Darkness = 'Darkness',
  Dragon = 'Dragon',
  Fighting = 'Fighting',
  Fire = 'Fire',
  Grass = 'Grass',
  Lightning = 'Lightning',
  Metal = 'Metal',
  Psychic = 'Psychic',
  Water = 'Water',
}

export interface Cardmarket {
  url: string
  updatedAt: UpdatedAt
  prices: { [key: string]: number }
}

export enum UpdatedAt {
  The20230327 = '2023/03/27',
  The20231115 = '2023/11/15',
}

export interface DatumImages {
  small: string
  large: string
}

export interface Legalities {
  unlimited: Expanded
  expanded?: Expanded
}

export enum Expanded {
  Legal = 'Legal',
}

export enum Rarity {
  Common = 'Common',
  Promo = 'Promo',
  Rare = 'Rare',
  RareHolo = 'Rare Holo',
  RareHoloEX = 'Rare Holo EX',
  RareHoloGX = 'Rare Holo GX',
  RareHoloV = 'Rare Holo V',
  RareUltra = 'Rare Ultra',
  Uncommon = 'Uncommon',
}

export interface Resistance {
  type: RetreatCost
  value: string
}

export interface Set {
  id: string
  name: string
  series: Series
  printedTotal: number
  total: number
  legalities: Legalities
  ptcgoCode?: string
  releaseDate: string
  updatedAt: string
  images: SetImages
}

export interface SetImages {
  symbol: string
  logo: string
}

export enum Series {
  Base = 'Base',
  BlackWhite = 'Black & White',
  DiamondPearl = 'Diamond & Pearl',
  ECard = 'E-Card',
  Ex = 'EX',
  Gym = 'Gym',
  HeartGoldSoulSilver = 'HeartGold & SoulSilver',
  Neo = 'Neo',
  Other = 'Other',
  Platinum = 'Platinum',
  Pop = 'POP',
  SunMoon = 'Sun & Moon',
  SwordShield = 'Sword & Shield',
  Xy = 'XY',
}

export enum Subtype {
  Basic = 'Basic',
  Ex = 'EX',
  Gx = 'GX',
  Mega = 'MEGA',
  Restored = 'Restored',
  SP = 'SP',
  Stage1 = 'Stage 1',
  Stage2 = 'Stage 2',
  TagTeam = 'TAG TEAM',
  TeamPlasma = 'Team Plasma',
  V = 'V',
}

export enum Supertype {
  Pokémon = 'Pokémon',
}

export interface Tcgplayer {
  url: string
  updatedAt: UpdatedAt
  prices?: Prices
}

export interface Prices {
  holofoil?: The1_StEditionHolofoil
  reverseHolofoil?: The1_StEditionHolofoil
  normal?: The1_StEditionHolofoil
  '1stEditionHolofoil'?: The1_StEditionHolofoil
  unlimitedHolofoil?: The1_StEditionHolofoil
}

export interface The1_StEditionHolofoil {
  low: number
  mid: number
  high: number
  market: number | null
  directLow: number | null
}
