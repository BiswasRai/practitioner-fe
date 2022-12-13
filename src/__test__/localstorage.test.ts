import { getAccessToken, setAccessToken } from "../utils/localStorage";

jest.mock("react", () => ({
  html: jest.fn(),
}));

const localStorageMock = (function () {
  type Store = {
    [key: string]: string;
  };

  let store: Store = {};

  return {
    getItem(key: string) {
      return store[key];
    },

    setItem(key: string, value: string) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    setAccessToken(value: string) {
      window.localStorage.setItem("access_token", value);
      setAccessToken(value);
      store["access_token"] = value;
    },

    getAccessToken() {
      window.localStorage.getItem("access_token");
      store["access_token"] = getAccessToken() || "";

      return store["access_token"];
    },

    removeItem(key: string) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("setAccessToken", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test("should set the access token", () => {
    //Act
    const token = "abcde";
    const expectedOutput = "abcde";

    //Assert
    localStorage.setAccessToken(token);

    //Arrange
    expect(localStorage.getItem("access_token")).toEqual(expectedOutput);
  });

  test("should return empty string when there's no access token", () => {
    //Assert
    const accessToken = localStorage.getAccessToken();

    //Arrange
    expect(accessToken).toEqual("");
  });
});
