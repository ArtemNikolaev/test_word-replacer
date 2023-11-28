import { ACTION, ACTIONS_TYPE, WORD_INDEX } from "./utils";

export function createPath(
  { word: w1, index: w1i }: WORD_INDEX,
  { word: w2, index: w2i }: WORD_INDEX,
): ACTION[] {
  if (!Array.isArray(w1) || !Array.isArray(w2) || isNaN(w1i) || isNaN(w2i)) {
    throw new Error("Wrong Function Parameters!");
  }

  const actions: ACTION[] = [];

  let w1startIndex;
  let w2startIndex;

  switch (true) {
    case w1i < w2i:
      w1startIndex = w1i - w2i;
      w2startIndex = 0;
      break;
    case w1i === w2i:
      w1startIndex = 0;
      w2startIndex = 0;
      break;
    case w1i > w2i:
      w1startIndex = 0;
      w2startIndex = w2i - w1i;
  }

  for (
    let w1index = w1startIndex, w2index = w2startIndex;
    w1[w1index] || w2[w2index];
    w1index++, w2index++
  ) {
    switch (true) {
      case !w1[w1index]:
        actions.push(<ACTION>{
          action: ACTIONS_TYPE.INSERT,
          value: w2[w2index],
        });
        break;
      case !w2[w2index]:
        actions.push(<ACTION>{
          action: ACTIONS_TYPE.DELETE,
        });
        break;
      default:
        if (w1[w1index] === w2[w2index]) {
          actions.push(<ACTION>{
            action: ACTIONS_TYPE.DO_NOTHING,
          });
        } else {
          actions.push(<ACTION>{
            action: ACTIONS_TYPE.REPLACE,
            value: w2[w2index],
          });
        }
    }
  }

  return actions;
}
