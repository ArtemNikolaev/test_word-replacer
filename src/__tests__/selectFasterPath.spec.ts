import { selectFasterPath } from "../selectFasterPath";
import { ACTION, ACTIONS_TYPE } from "../utils";

describe("selectFasterPath", () => {
  const del: ACTION = {
    action: ACTIONS_TYPE.DELETE,
  };
  const replace: ACTION = {
    action: ACTIONS_TYPE.REPLACE,
    value: "b",
  };
  const insert: ACTION = {
    action: ACTIONS_TYPE.INSERT,
    value: "a",
  };
  const nothing: ACTION = {
    action: ACTIONS_TYPE.DO_NOTHING,
  };

  test("should works well", () => {
    expect(selectFasterPath([del], [nothing])).toEqual([nothing]);
    expect(selectFasterPath([insert], [nothing])).toEqual([nothing]);
    expect(selectFasterPath([replace], [nothing])).toEqual([nothing]);
    expect(selectFasterPath([del, del], [replace])).toEqual([replace]);
    expect(selectFasterPath([del, del], [insert])).toEqual([insert]);
    expect(selectFasterPath([replace, replace], [insert])).toEqual([insert]);
    expect(selectFasterPath([replace, replace], [del])).toEqual([del]);
    expect(selectFasterPath([insert, insert], [del])).toEqual([del]);
    expect(selectFasterPath([insert, insert], [replace])).toEqual([replace]);
  });
});
