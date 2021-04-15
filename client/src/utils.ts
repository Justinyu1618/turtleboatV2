export function serializeCoord(coord: number[]) {
  return `${coord[0]} ${coord[1]}`;
}

export function deserializeCoord(coordStr: string) {
  return coordStr.split(" ").map((i) => parseInt(i));
}
