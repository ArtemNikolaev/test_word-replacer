import { logger } from "./src/logger";
import { searchPath } from "./src/searchPath";
import { generateLoggerMessage } from "./src/generateLoggerMessage";

const minimalDistance = (word1: string, word2: string): void => {
  const actions = searchPath(word1, word2);
  const str = generateLoggerMessage(actions, word1);

  logger.info(str);
};

(() => {
  minimalDistance(process.argv[2], process.argv[3]);
})();
