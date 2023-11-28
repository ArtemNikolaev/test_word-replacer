import { ACTION, ACTIONS_TYPE } from "./utils";

export function generateLoggerMessage(actions: ACTION[], word) {
  const readyActions = actions.reverse();
  const wordArr = word.split("");

  let steps = 0;
  let actionsStr = `${wordArr.join("")}\n---\n`;

  let currentIndex = 0;
  while (readyActions.length) {
    const action = readyActions.pop();
    switch (action.action) {
      case ACTIONS_TYPE.DO_NOTHING:
        currentIndex++;
        break;
      case ACTIONS_TYPE.DELETE:
        steps++;
        wordArr.splice(currentIndex, 1);
        actionsStr += `${wordArr.join("")}\n`;
        break;
      case ACTIONS_TYPE.INSERT:
        steps++;
        if (currentIndex === 0) {
          wordArr.splice(0, 0, action.value);
        } else {
          wordArr.push(action.value);
        }
        actionsStr += `${wordArr.join("")}\n`;
        break;
      case ACTIONS_TYPE.REPLACE:
        steps++;
        wordArr.splice(currentIndex, 1, action.value);
        currentIndex++;
        actionsStr += `${wordArr.join("")}\n`;
    }
  }

  return `Amount Of Steps: ${steps}\n${actionsStr}`;
}
