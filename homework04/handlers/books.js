const books = require("../pkg/books/index");
const utils = require("./utils");

const validate = require("../pkg/books/validator");

const create = async (req, res) => {
  try {
    await validate(req.body);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }

  try {
    // utils.clearEmptySpace(req.body);
    // const { title, publish_year, price, author, genre } = req.body;
    // const condition = title && publish_year && price && author && genre;
    // if (!condition) {
    //   return res.status(400).send("Bad request");
    // }
    const data = await books.create(req.body);
    res.status(201).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getAll = async (req, res) => {
  try {
    const data = await books.getAll();
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getOne = async (req, res) => {
  try {
    const data = await books.getOne(req.params.id);
    if (!data) return res.status(404).send("Not found");
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
};

const update = async (req, res) => {
  // utils.clearEmptySpace(req.body);

  // const { title, publish_year, price, author, genre } = req.body;

  // const condition = title && publish_year && price && author && genre;

  // if (!condition) {
  //   return res.status(400).send("Bad request");
  // }
  try {
    await validate(req.body);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }

  try {
    const data = await books.update(req.params.id, req.body);

    if (data.matchedCount === 0) {
      return res.status(404).send("Not Found");
    }

    if (data.matchedCount === 1 && data.modifiedCount === 0) {
      return res.status(200).send("Already up to date");
    }

    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const partialUpdate = async (req, res) => {
  try {
    await validate(req.body, "UPDATE");
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }

  try {
    // utils.clearEmptySpace(req.body);
    // const { title, publish_year, price, author, genre } = req.body;
    // let elements = Object.values(req.body);

    // let condition_keys = title || publish_year || price || author || genre;

    // let condition_key_values = elements.some(
    //   (element) => typeof element === "string" && element === ""
    // );

    // if (!condition_keys || condition_key_values) {
    //   return res.status(400).send("Bad request");
    // }

    let data = await books.partialUpdate(req.params.id, req.body);

    if (data.matchedCount === 0) {
      return res.status(404).send("Not Found");
    }

    if (data.matchedCount === 1 && data.modifiedCount === 0) {
      return res.status(200).send("Already up to date");
    }

    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const remove = async (req, res) => {
  try {
    const b = await books.remove(req.params.id);
    if (b.deletedCount === 0) {
      return res.status(404).send("Not found");
    }

    res.status(204).send();
  } catch (error) {
    console.log(error);
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
