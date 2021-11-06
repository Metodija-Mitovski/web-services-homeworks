const validator = require("../pkg/articles/validate");
const article = require("../pkg/articles");

const create = async (req, res) => {
  try {
    await validator(req.body, "CREATE");
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }

  try {
    let data = {
      ...req.body,
      author_id: req.user.uid,
    };

    let out = await article.create(data);
    res.status(201).send(out);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

const getAll = async (req, res) => {
  try {
    let articles = await article.getAll();
    return res.status(200).send(articles);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

const getMine = async (req, res) => {
  try {
    let artilces = await article.getAllByUser(req.user.uid);
    return res.status(200).send(artilces);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

const getOne = async (req, res) => {
  try {
    let articles = await article.getOne(req.params.id);
    return res.status(200).send(articles);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

const update = async (req, res) => {
  try {
    await validator(req.body, "CREATE");
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }

  try {
    await article.update(req.params.id, req.user.uid, req.body);
    res.status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

const patrialUpdate = async (req, res) => {
  try {
    await validator(req.body, "INSERT");
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }

  try {
    await article.partialUpdate(req.params.id, req.user.uid, req.body);
    return res.status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

const remove = async (req, res) => {
  try {
    await article.remove(req.params.id, req.user.uid);
    res.status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

module.exports = {
  create,
  getAll,
  getMine,
  getOne,
  update,
  patrialUpdate,
  remove,
};
