import { createPath } from "../createPath";
import { ACTION, ACTIONS_TYPE } from "../utils";

describe("createPath", function () {
  test("should throw on bad parameters", () => {
    const good = {
      word: ["a", "b"],
      index: 0,
    };
    const badWord = {
      word: "word",
      index: 0,
    };
    const badIndex = {
      word: ["a", "b"],
      index: "bla",
    };

    expect(() => {
      // @ts-ignore
      createPath();
    }).toThrow();

    expect(() => {
      // @ts-ignore
      createPath({}, {});
    }).toThrow();

    expect(() => {
      // @ts-ignore
      createPath(badWord, good);
    }).toThrow();

    expect(() => {
      // @ts-ignore
      createPath(badIndex, good);
    }).toThrow();

    expect(() => {
      // @ts-ignore
      createPath(good, badWord);
    }).toThrow();

    expect(() => {
      // @ts-ignore
      createPath(good, badIndex);
    }).toThrow();
  });

  test("should return correct answer", () => {
    const word = ["b", "l", "a"];
    expect(createPath({ word, index: 0 }, { word, index: 0 })).toEqual(<
      ACTION[]
    >[
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

    expect(createPath({ word, index: 0 }, { word, index: 2 })).toEqual(<
      ACTION[]
    >[
      {
        action: ACTIONS_TYPE.INSERT,
        value: "b",
      },
      {
        action: ACTIONS_TYPE.INSERT,
        value: "l",
      },
      {
        action: ACTIONS_TYPE.REPLACE,
        value: "a",
      },
      {
        action: ACTIONS_TYPE.DELETE,
      },
      {
        action: ACTIONS_TYPE.DELETE,
      },
    ]);

    expect(createPath({ word, index: 1 }, { word, index: 1 })).toEqual(<
      ACTION[]
    >[
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

    expect(
      createPath(
        { word: ["o", "b", "l", "a", "o"], index: 2 },
        { word, index: 1 },
      ),
    ).toEqual(<ACTION[]>[
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

    expect(createPath({ word, index: 2 }, { word, index: 0 })).toEqual(<
      ACTION[]
    >[
      {
        action: ACTIONS_TYPE.DELETE,
      },
      {
        action: ACTIONS_TYPE.DELETE,
      },
      {
        action: ACTIONS_TYPE.REPLACE,
        value: "b",
      },
      {
        action: ACTIONS_TYPE.INSERT,
        value: "l",
      },
      {
        action: ACTIONS_TYPE.INSERT,
        value: "a",
      },
    ]);
  });
});
