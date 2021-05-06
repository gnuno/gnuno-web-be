const Entry = require("../models/Entry");
const { validateRequiredFields } = require("../utils/Validator");

async function getEntries(req, res) {
  const { type } = req.query;

  if (!type) {
    const entries = await Entry.find({});
    if (!entries.length) return res.status(204).end();
    return res.status(200).json(entries);
  }

  const entries = await Entry.find({ type });
  if (!entries.length) return res.status(204).end();
  return res.status(200).json(entries);
}

async function createEntry(req, res) {
  try {
    validateRequiredFields(req.body, ["title", "description", "type"]);
    const { title, description, type, image, author, date } = req.body;

    const created = await Entry.create({
      title,
      description,
      type,
      image,
      author,
      date,
    });

    return res.status(201).json(created);
  } catch (err) {
    switch (err.code) {
      case 400:
        return res.status(400).send({ message: err.message });
      default:
        return res.status(500).send({ message: err.message });
    }
  }
}

async function editEntry(req, res) {
  try {
    const { title, description, type, image } = req.body;
    const { id } = req.params;

    const entryFromDB = await Entry.findById(id);

    let updated = {
      title: title ? title : entryFromDB.title,
      description: description ? description : entryFromDB.description,
      type: type ? type : entryFromDB.type,
      image: image ? image : entryFromDB.image,
    };

    await Entry.findOneAndUpdate(
      { _id: id },
      { $set: updated },
      { omitUndefined: true }
    );
    return res.status(200).end();
  } catch (err) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "There was an error during patching" });
  }
}

async function deleteEntry(req, res) {
  try {
    const { id } = req.params;

    const response = await Entry.deleteOne({ _id: id });

    if (!response.n) return res.status(404).end();
    return res.status(200).end();
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Something wrong happend while deleteing Entry" });
  }
}

module.exports = {
  getEntries,
  createEntry,
  editEntry,
  deleteEntry,
};
