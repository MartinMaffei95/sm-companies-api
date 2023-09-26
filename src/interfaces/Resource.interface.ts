export type Resource = {
  name: string;
  image: string;
  db_letter: number;
  transportation: number;
  retailable: boolean;
  research: boolean;
  exchangeTradable: boolean;
  realmAvailable: boolean;
};

export type ResourceOnExchange = {
  kind: number;
  image: string;
  price: number;
  is_up: boolean;
  realmId: number;
};

export type CombinedResource = ResourceOnExchange & Pick<Resource, "name">;
