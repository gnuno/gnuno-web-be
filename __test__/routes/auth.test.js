const authResource = require("../../src/resources/auth.resource");

const postSpy = jest.fn();

jest.doMock("express", () => {
  return {
    Router() {
      return {
        post: postSpy,
      };
    },
  };
});

describe("Auth Routes", () => {
  require("../../src/routes/auth.routes");
  test("should test login route", () => {
    expect(postSpy).toHaveBeenCalledWith("/login", authResource.login);
  });
});
