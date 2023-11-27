export enum ACTIONS_TYPE {
  DO_NOTHING,
  REPLACE,
  INSERT,
  DELETE,
}

export type ACTION = {
  action: ACTIONS_TYPE;
  value: string | undefined;
};
