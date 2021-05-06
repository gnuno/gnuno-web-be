const mongoose = require("mongoose");
const Entry = require("../../src/models/Entry");
const entryData = {
  title: "TekLoon",
  type: "proyecto",
  date: new Date(),
  description: "Facebook",
  author: "MatiGimenez",
};
let connection;

describe("Entry model", () => {
  // It's just so easy to connect to the MongoDB Memory Server
  // By using mongoose.connect
  beforeAll(async () => {
    connection = await mongoose.connect(
      process.env.MONGO_URL,
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
      (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  });
  afterAll(async () => {
    await connection.close();
  });

  it("should create & save entry successfully", async () => {
    const validEntry = new Entry(entryData);
    const savedEntry = await validEntry.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedEntry._id).toBeDefined();
    expect(savedEntry.title).toBe(entryData.title);
    expect(savedEntry.type).toBe(entryData.type);
    expect(savedEntry.date).toBe(entryData.date);
    expect(savedEntry.description).toBe(entryData.description);
    expect(savedEntry.author).toBe(entryData.author);
  });

  it("should insert entry successfully, but the field does not defined in schema should be undefined", async () => {
    const entryWithInvalidField = new Entry({
      title: "TekLoon",
      type: "Male",
      description: "desc",
      nickname: "Handsome TekLoon",
    });
    const savedEntryWithInvalidField = await entryWithInvalidField.save();
    expect(savedEntryWithInvalidField._id).toBeDefined();
    expect(savedEntryWithInvalidField.nickname).toBeUndefined();
  });

  it("creates entry without required field, should failed", async () => {
    const entryWithoutRequiredField = new Entry({ image: "TekLoon" });
    let err;
    try {
      const savedEntryWithoutRequiredField = await entryWithoutRequiredField.save();
      error = savedEntryWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.title).toBeDefined();
    expect(err.errors.type).toBeDefined();
    expect(err.errors.description).toBeDefined();
  });
});
