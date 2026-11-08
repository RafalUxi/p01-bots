export type MapType = {
  x: number;
  y: number;
  color: string;
};

export type PlayerCordsType = {
  x: number;
  y: number;
  color: number;
  nick?: string;
  state?: string;
};

export type ObstaclesType = {
  x: number;
  y: number;
  type?: string; // in library - obstacle parametry (const)
};

export type cordsType = {
  mapCords: MapType[];
  playerCords: PlayerCordsType[];
  obstaclesCords: ObstaclesType[];
};
