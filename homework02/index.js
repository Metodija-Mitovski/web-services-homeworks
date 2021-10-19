const express = require("express");

const api = express();

api.use(express.json());

let students = [];

api.get("/students", (req, res) => {
  res.status(200).send(students);
});

api.post("/students", (req, res) => {
  students = [...students, req.body];
  res.status(201).send(req.body);
});

api.get("/students/:id", (req, res) => {
  if (!students[req.params.id]) {
    return res.status(404).send("Not Found");
  }
  res.status(200).send(students[req.params.id]);
});

api.put("/students/:id", (req, res) => {
  if (!students[req.params.id]) {
    return res.status(404).send("Not Found");
  }

  students = students.map((s, i) => {
    if (i == req.params.id) {
      s = req.body;
    }
    return s;
  });

  res.status(200).send();
});

api.patch("/students/:id", (req, res) => {
  if (!students[req.params.id]) {
    return res.status(404).send("Not Found");
  }

  students = students.map((s, i) => {
    if (i == req.params.id) {
      s.gpa = req.body.gpa;
    }

    return s;
  });

  res.status(200).send(students[req.params.id]);
});

api.delete("/students/:id", (req, res) => {
  if (!students[req.params.id]) {
    return res.status(404).send("Not Found");
  }
  students = students.filter((s, i) => i != req.params.id);
  res.status(204).send();
});

api.listen(10000, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log("Server successfully started on port 10000");
});
