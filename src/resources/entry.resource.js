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

module.exports = {
  getEntries,
  createEntry,
};
