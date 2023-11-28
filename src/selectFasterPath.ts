import { ACTION, ACTIONS_TYPE } from "./utils";

export function selectFasterPath(path1: ACTION[], path2: ACTION[]) {
  const p1length = path1.reduce((acc: number, action: ACTION) => {
    if (action.action != ACTIONS_TYPE.DO_NOTHING) {
      acc++;
    }
    return acc;
  }, 0);
  const p2length = path2.reduce((acc: number, action: ACTION) => {
    if (action.action != ACTIONS_TYPE.DO_NOTHING) {
      acc++;
    }
    return acc;
  }, 0);

  return p1length < p2length ? path1 : path2;
}
