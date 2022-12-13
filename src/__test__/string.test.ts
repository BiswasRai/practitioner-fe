import { interpolate, isEmpty } from "../utils/string";

jest.mock("react", () => ({
  html: jest.fn(),
}));

describe("interpolate", function () {
  test("should return string when inputs are string with :key and object", () => {
    // Arrange
    const stringInput = "/users/:userId";
    const interpolateObject = { userId: 2 };

    const expectedOutput = "/users/2";

    // Act
    const result = interpolate(stringInput, interpolateObject);

    // Assert
    expect(result).toBe(expectedOutput);
  });

  test("should return string when input string is without :key and object is empty", () => {
    // Arrange
    const stringInput = "/users";
    const interpolateObject = {};

    const expectedOutput = "/users";

    // Act
    const result = interpolate(stringInput, interpolateObject);

    // Assert
    expect(result).toBe(expectedOutput);
  });

  const StringInput = "/user/:userId";
  const badValueInputs = {
    ArrayInput: [],
    NaNInput: NaN,
    objectInput: {},
    nullInput: null,
    functionInput: () => {},
    undefinedInput: undefined,
  };

  const expectedOutput = "/user/:userId";

  it.each(
    Object.values(badValueInputs).map((input) => [input, expectedOutput])
  )(
    `should return ${expectedOutput} when the first input is string and second input is '%s'`,
    (input: any, expected) => {
      // Act
      const result = interpolate(StringInput, input);

      // Assert
      expect(result).toBe(expected);
    }
  );
});

describe("isEmpty", function () {
  test("should return `true` for empty values", () => {
    //Assert
    expect(isEmpty("")).toBe(true);
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty({})).toBe(true);
  });

  test("should return `false` for non-empty values", () => {
    //Assert
    expect(isEmpty([1])).toBe(false);
    expect(isEmpty(1)).toBe(false);
    expect(isEmpty("abc")).toBe(false);
    expect(isEmpty({ a: "abc" })).toBe(false);
  });
});
