const cars = require("./cars");

const create = async (req, res) => {
  try {
    const { manufacturer, model, year, engine, hp, fuel } = req.body;

    let condition = !manufacturer || !model || !year || !engine || !hp || !fuel;
    if (condition) {
      return res.status(400).send("Bad request");
    }

    let data = await cars.create(req.body);

    res.status(201).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getAll = async (req, res) => {
  try {
    let data = await cars.getAll();
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getOne = async (req, res) => {
  try {
    let data = await cars.getOne(req.params.id);

    if (!data) {
      return res.status(404).send("Not Found");
    }

    return res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const { manufacturer, model, year, engine, hp, fuel } = req.body;

    const condition =
      !manufacturer || !model || !year || !engine || !hp || !fuel;

    if (condition) return res.status(400).send("Bad request");

    let data = await cars.update(req.params.id, req.body);

    if (!data) return res.status(404).send("Not Found");

    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const partialUpdate = async (req, res) => {
  try {
    const { manufacturer, model, year, engine, hp, fuel } = req.body;
    let condition = manufacturer || model || year || engine || hp || fuel;

    if (!condition) {
      return res.status(400).send("Bad request");
    }

    const data = await cars.partialUpdate(req.params.id, req.body);

    if (!data) return res.status(404).send("Not found");

    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const remove = async (req, res) => {
  try {
    if (await cars.remove(req.params.id)) {
      return res.status(204).send();
    }

    return res.status(404).send("Not found");
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
