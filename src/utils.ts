export enum ACTIONS_TYPE {
  DO_NOTHING,
  REPLACE,
  INSERT,
  DELETE,
}

export type ACTION = {
  action: ACTIONS_TYPE;
  value?: string;
};

export type WORD_INDEX = {
  word: string[];
  index: number;
};
