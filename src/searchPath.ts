import { ACTION, WORD_INDEX } from "./utils";
import { createPath } from "./createPath";
import { selectFasterPath } from "./selectFasterPath";

export function searchPath(word1: string, word2: string): ACTION[] {
  if (typeof word1 != "string" || typeof word2 != "string") {
    throw new Error('("Wrong Function Parameters!")');
  }

  const word1Array = word1.split("");
  const word2Array = word2.split("");

  let resultPath: ACTION[] = createPath(
    <WORD_INDEX>{ word: word1Array, index: 0 },
    <WORD_INDEX>{ word: word2Array, index: 0 },
  );

  word2Array.forEach((w2Letter, w2LetterIndex, w2Array) => {
    word1Array.forEach((w1Letter, w1LetterIndex, w1Array) => {
      if (w2Letter === w1Letter) {
        const path = createPath(
          <WORD_INDEX>{ word: w1Array, index: w1LetterIndex },
          <WORD_INDEX>{ word: w2Array, index: w2LetterIndex },
        );

        resultPath = selectFasterPath(resultPath, path);
      }
    });
  });

  return resultPath;
}
