import { ACTIONS_TYPE, ACTION } from "./utils";

type PATH = {
  nextWord2Index: number;
  stop: boolean;
  steps: number;
  actions: ACTION[];
};
type DEFAULT_PATH = Omit<PATH, "nextWord2Index">;

export function searchPath(word1, word2): ACTION[] {
  const allPaths = [];
  const defaultPath: DEFAULT_PATH = {
    stop: false,
    steps: 0,
    actions: [],
  };

  word1.split("").forEach((word1Letter, word1Index, word1Array) => {
    allPaths.forEach((path) => {
      if (path.stop) {
        path.actions.push({ action: ACTIONS_TYPE.DELETE });
        path.steps++;

        return;
      }

      if (word1Letter === word2[path.nextWord2Index]) {
        path.actions.push({ action: ACTIONS_TYPE.DO_NOTHING });
      } else {
        path.actions.push({
          action: ACTIONS_TYPE.REPLACE,
          value: word2[path.nextWord2Index],
        });
        path.steps++;
      }

      path.nextWord2Index++;

      if (path.nextWord2Index === word2.length) {
        path.stop = true;
      }

      if (word1Index + 1 === word1Array.length) {
        for (; path.nextWord2Index < word2.length; path.nextWord2Index++) {
          path.actions.push({
            action: ACTIONS_TYPE.DELETE,
            value: word2[path.nextWord2Index],
          });
          path.steps++;
        }

        path.stop = true;
      }
    });

    if (word1Letter === word1[0]) {
      const path: PATH = Object.assign(
        {},
        <DEFAULT_PATH>structuredClone(defaultPath),
        {
          nextWord2Index: 1,
        },
      );
      path.actions.push(<ACTION>{
        action: ACTIONS_TYPE.DO_NOTHING,
      });
      allPaths.push(path);
    }
    defaultPath.steps++;
    defaultPath.actions.push(<ACTION>{
      action: ACTIONS_TYPE.DELETE,
    });
  });

  return allPaths.sort((arr1: PATH, arr2: PATH): number =>
    arr1.steps > arr2.steps ? 1 : -1,
  )[0].actions;
}
