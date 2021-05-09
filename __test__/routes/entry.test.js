const entryResource = require("../../src/resources/entry.resource");

const getSpy = jest.fn();
const postSpy = jest.fn();
const patchSpy = jest.fn();
const deleteSpy = jest.fn();

jest.doMock("express", () => {
  return {
    Router() {
      return {
        get: getSpy,
        post: postSpy,
        patch: patchSpy,
        delete: deleteSpy,
      };
    },
  };
});

describe("Entry Router", () => {
  require("../../src/routes/entry.routes");
  it("should test get entries", () => {
    expect(getSpy).toHaveBeenCalledWith("/", entryResource.getEntries);
  });

  it("should test post entry", () => {
    expect(postSpy).toHaveBeenCalledWith("/", entryResource.createEntry);
  });

  it("should test patch entry", () => {
    expect(patchSpy).toHaveBeenCalledWith("/:id", entryResource.editEntry);
  });

  it("should test patch entry", () => {
    expect(deleteSpy).toHaveBeenCalledWith("/:id", entryResource.deleteEntry);
  });
});
