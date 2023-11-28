import { ACTION, ACTIONS_TYPE } from "../utils";
import { searchPath } from "../searchPath";

describe("searchPath", function () {
  test("should throw on bad parameters", () => {
    // @ts-ignore
    expect(() => searchPath()).toThrow();
    // @ts-ignore
    expect(() => searchPath(12, 12)).toThrow();
    // @ts-ignore
    expect(() => searchPath({}, {})).toThrow();
    // @ts-ignore
    expect(() => searchPath([], [])).toThrow();
  });

  test("should return correct result", () => {
    expect(searchPath("bla", "bla")).toEqual(<ACTION[]>[
      {
        action: ACTIONS_TYPE.DO_NOTHING,
      },
      {
        action: ACTIONS_TYPE.DO_NOTHING,
      },
      {
        action: ACTIONS_TYPE.DO_NOTHING,
      },
    ]);
    expect(searchPath("0bla0", "bla")).toEqual(<ACTION[]>[
      {
        action: ACTIONS_TYPE.DELETE,
      },
      {
        action: ACTIONS_TYPE.DO_NOTHING,
      },
      {
        action: ACTIONS_TYPE.DO_NOTHING,
      },
      {
        action: ACTIONS_TYPE.DO_NOTHING,
      },
      {
        action: ACTIONS_TYPE.DELETE,
      },
    ]);
    expect(searchPath("blatofo", "tofon")).toEqual(<ACTION[]>[
      {
        action: ACTIONS_TYPE.DELETE,
      },
      {
        action: ACTIONS_TYPE.DELETE,
      },
      {
        action: ACTIONS_TYPE.DELETE,
      },
      {
        action: ACTIONS_TYPE.DO_NOTHING,
      },
      {
        action: ACTIONS_TYPE.DO_NOTHING,
      },
      {
        action: ACTIONS_TYPE.DO_NOTHING,
      },
      {
        action: ACTIONS_TYPE.DO_NOTHING,
      },
      {
        action: ACTIONS_TYPE.INSERT,
        value: "n",
      },
    ]);
    expect(searchPath("ofonbla", "tofon")).toEqual(<ACTION[]>[
      {
        action: ACTIONS_TYPE.INSERT,
        value: "t",
      },

      {
        action: ACTIONS_TYPE.DO_NOTHING,
      },
      {
        action: ACTIONS_TYPE.DO_NOTHING,
      },
      {
        action: ACTIONS_TYPE.DO_NOTHING,
      },
      {
        action: ACTIONS_TYPE.DO_NOTHING,
      },
      {
        action: ACTIONS_TYPE.DELETE,
      },
      {
        action: ACTIONS_TYPE.DELETE,
      },
      {
        action: ACTIONS_TYPE.DELETE,
      },
    ]);
  });
});
