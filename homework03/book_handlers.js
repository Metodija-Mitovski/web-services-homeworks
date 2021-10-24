const books = require("./books");

const create = async (req, res) => {
  try {
    const { title, publish_year, price, author, genre } = req.body;
    const condition = !title || !publish_year || !price || !author || !genre;

    if (condition) {
      return res.status(400).send("Bad request");
    }

    let data = await books.create(req.body);

    res.status(201).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getAll = async (req, res) => {
  try {
    const data = await books.getAll();

    return res.status(200).send(data);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const getOne = async (req, res) => {
  try {
    const data = await books.getOne(req.params.id);

    if (!data) return res.status(404).send("Not found");
    return res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const { title, publish_year, price, author, genre } = req.body;

    const condition = !title || !publish_year || !price || !author || !genre;

    if (condition) {
      return res.status(400).send("Bad request");
    }

    const data = await books.update(req.params.id, req.body);
    if (!data) return res.status(404).send("Not Found");
    return res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const partialUpdate = async (req, res) => {
  try {
    const { title, publish_year, price, author, genre } = req.body;
    const condition = title || publish_year || price || author || genre;

    if (!condition) return res.status(400).send("Bad request");

    const data = await books.partialUpdate(req.params.id, req.body);
    if (!data) return res.status(404).send("Not found");

    return res.status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const remove = async (req, res) => {
  try {
    let data = await books.remove(req.params.id);

    if (!data) return res.status(404).send("Not found");

    return res.status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  partialUpdate,
  remove,
};
