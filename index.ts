import { logger } from "./src/logger";

const getDp = (i, j, dp) => {
  if (i < 0 && j < 0) return 0;
  if (i < 0) return j + 1;
  if (j < 0) return i + 1;
  return dp[i][j];
};

const minimalDistance = (word1, word2) => {
  const n = word1.length;
  const m = word2.length;
  const dp = Array(n);

  for (let i = 0; i < n; i++) {
    dp[i] = Array(m);
    for (let j = 0; j < m; j++) {
      dp[i][j] = Math.min(
        getDp(i - 1, j, dp) + 1,
        getDp(i, j - 1, dp) + 1,
        getDp(i - 1, j - 1, dp) + (word1[i] === word2[j] ? 0 : 1),
      );
    }
  }

  let distance = getDp(n - 1, m - 1, dp);
  logger.info(distance);
  let curI = n - 1;
  let curJ = m - 1;
  let curWord = Array.from(word2);

  logger.info(curWord.join(""));
  while (distance > 0) {
    const del = getDp(curI, curJ - 1, dp);
    const insert = getDp(curI - 1, curJ, dp);
    const replace = getDp(curI - 1, curJ - 1, dp);
    if (replace < distance) {
      curWord[curJ] = word1[curI];
      curI -= 1;
      curJ -= 1;
      distance = replace;
      logger.info(curWord.join(""));
    } else if (del < distance) {
      curWord[curJ] = "";
      curJ -= 1;
      distance = del;
      logger.info(curWord.join(""));
    } else if (insert < distance) {
      curWord[curJ + 1] = word1[curI];
      curI -= 1;
      distance = insert;
      logger.info(curWord.join(""));
    } else {
      curI -= 1;
      curJ -= 1;
    }
  }
};

(() => {
  minimalDistance(process.argv[2], process.argv[3]);
})();
