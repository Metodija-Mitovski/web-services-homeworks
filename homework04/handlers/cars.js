const cars = require("../pkg/cars");
const utils = require("./utils");

const create = async (req, res) => {
  utils.clearEmptySpace(req.body);
  try {
    const { manufacturer, model, year, engine, hp, fuel } = req.body;

    let condition = manufacturer && model && year && engine && hp && fuel;

    if (!condition) {
      return res.status(400).send("Bad request");
    }

    let car = await cars.create(req.body);
    res.status(201).send(car);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getAll = async (req, res) => {
  try {
    const data = await cars.getAll();

    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getOne = async (req, res) => {
  try {
    let c = await cars.getOne(req.params.id);
    if (!c) {
      return res.status(404).send("Not found");
    }

    res.status(200).send(c);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  utils.clearEmptySpace(req.body);
  try {
    const { manufacturer, model, year, engine, hp, fuel } = req.body;

    const condition = manufacturer && model && year && engine && hp && fuel;

    if (!condition) {
      return res.status(400).send("Bad request");
    }

    let data = await cars.update(req.params.id, req.body);

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
  utils.clearEmptySpace(req.body);

  try {
    const { manufacturer, model, year, engine, hp, fuel } = req.body;
    let elements = Object.values(req.body);

    let condition_keys = manufacturer || model || year || engine || hp || fuel;

    let condition_key_values = elements.some(
      (element) => typeof element === "string" && element === ""
    );

    if (!condition_keys || condition_key_values) {
      return res.status(400).send("Bad request");
    }

    let data = await cars.partialUpdate(req.params.id, req.body);

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
    const c = await cars.remove(req.params.id);
    if (c.deletedCount === 0) {
      return res.status(404).send("Not found");
    }

    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
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
