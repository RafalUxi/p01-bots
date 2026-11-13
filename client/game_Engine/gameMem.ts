import { MapType, ObstaclesType, PlayerCordsType } from '../../global/types';

export let mapCords: MapType[];
export let playersCords: PlayerCordsType[];
export let ObstaclesCords: ObstaclesType[];
export let playerViewCords: MapType[];

// Functions cuz data is read-only
export function saveMapCords(mapCordsInput: MapType[]) {
  mapCords = mapCordsInput;
}
export function savePlayerCords(mapPlayersInput: MapType[]) {
  playersCords = mapPlayersInput;
}
export function saveObstaclesCords(mapObstaclesInput: MapType[]) {
  ObstaclesCords = mapObstaclesInput;
}

export function savePlayerViewCords(playerViewCordsInput: MapType[]) {
  playerViewCords = playerViewCordsInput;
}
