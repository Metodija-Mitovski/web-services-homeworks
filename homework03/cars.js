const fs = require("./fs");
const cars_db = "cars.json";

const create = async (carData) => {
  let data = await fs.read(cars_db);
  let id = 1;

  if (data.length !== 0) {
    id = data[data.length - 1].id + 1;
  }

  let car = {
    id,
    manufacturer: carData.manufacturer,
    model: carData.model,
    year: carData.year,
    engine: carData.engine,
    hp: carData.hp,
    fuel: carData.fuel,
  };

  data = [...data, car];

  await fs.write(cars_db, data);

  return car;
};

const getAll = async () => {
  const data = await fs.read(cars_db);
  return data;
};

const getOne = async (id) => {
  let data = await fs.read(cars_db);
  let car = data.filter((car) => car.id === Number(id));
  if (car.length === 0) return null;
  return car[0];
};

const update = async (id, carData) => {
  let data = await fs.read(cars_db);

  const car = data.filter((c) => c.id === Number(id));
  if (car.length === 0) return null;

  data = data.map((c) => {
    if (c.id === Number(id)) {
      c.manufacturer = carData.manufacturer;
      c.model = carData.model;
      c.year = carData.year;
      c.engine = carData.engine;
      c.hp = carData.hp;
      c.fuel = carData.fuel;
    }

    return c;
  });

  await fs.write(cars_db, data);

  return data;
};

const partialUpdate = async (id, carData) => {
  let data = await fs.read(cars_db);

  const car = data.filter((c) => c.id === Number(id));
  if (car.length === 0) return null;

  data = data.map((c) => {
    if (c.id === Number(id)) {
      c.manufacturer = carData.manufacturer
        ? carData.manufacturer
        : c.manufacturer;
      c.model = carData.model ? carData.model : c.model;
      c.year = carData.year ? carData.year : c.year;
      c.engine = carData.engine ? carData.engine : c.engine;
      c.hp = carData.hp ? carData.hp : c.hp;
      c.fuel = carData.fuel ? carData.fuel : c.fuel;
    }

    return c;
  });

  await fs.write(cars_db, data);
  return data;
};

const remove = async (id) => {
  let data = await fs.read(cars_db);
  let prevLength = data.length;

  data = data.filter((c) => c.id !== Number(id));

  if (data.length === prevLength) {
    return false;
  }

  await fs.write(cars_db, data);

  return true;
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  partialUpdate,
  remove,
};
