const Car = require("./mongo");

const create = async (carData) => {
  const c = new Car(carData);
  await c.save();
  return c;
};

const getAll = async () => {
  const data = await Car.find({});
  return data;
};

const getOne = async (id) => {
  const data = await Car.findOne({ _id: id });
  return data;
};

const update = async (id, carData) => {
  return await Car.updateOne({ _id: id }, carData);
};

const partialUpdate = async (id, carData) => {
  return await Car.updateOne({ _id: id }, carData);
};

const remove = async (id) => {
  return await Car.deleteOne({ _id: id });
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  partialUpdate,
  remove,
};
