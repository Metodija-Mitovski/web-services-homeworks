const express = require("express");
const fs = require("fs");
const api = express();
api.use(express.json());

const students_data = "students.json";

const read = (fileName) => {
  return new Promise((success, fail) => {
    fs.readFile(fileName, (err, data) => {
      if (err) return fail(err);
      return success(data);
    });
  });
};

const write = (fileName, data) => {
  return new Promise((success, fail) => {
    fs.writeFile(fileName, data, (err) => {
      if (err) return fail(err);
      return success();
    });
  });
};

api.get("/students", async (req, res) => {
  try {
    const students = await read(students_data);
    const parsed_students = JSON.parse(students);

    res.status(200).send(parsed_students);
  } catch (error) {
    res.status(400).send(error);
  }
});

api.post("/students", async (req, res) => {
  try {
    const students = await read(students_data);
    let parsed_students = JSON.parse(students);
    parsed_students = [...parsed_students, req.body];
    let output = JSON.stringify(parsed_students);

    await write(students_data, output);
    res.status(201).send(req.body);
  } catch (error) {
    res.status(400).send(error);
  }
});

api.get("/students/:id", async (req, res) => {
  try {
    const students = await read(students_data);
    const parsed_students = JSON.parse(students);

    const student = parsed_students.find((s, i) => i == req.params.id);
    if (!student) return res.status(404).send("Not Found");
    res.status(200).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

api.put("/students/:id", async (req, res) => {
  try {
    const students = await read(students_data);
    let parsed_students = JSON.parse(students);

    const student = parsed_students.find((s, i) => i == req.params.id);
    if (!student) return res.status(404).send("Not Found");

    parsed_students = parsed_students.map((s, i) => {
      if (i == req.params.id) {
        s = req.body;
      }
      return s;
    });

    const output = JSON.stringify(parsed_students);

    await write(students_data, output);
    res.status(200).send();
  } catch (error) {
    res.status(400).send(error);
  }
});

api.patch("/students/:id", async (req, res) => {
  try {
    const students = await read(students_data);
    let parsed_students = JSON.parse(students);

    const student = parsed_students.find((s, i) => i == req.params.id);
    if (!student) return res.status(404).send("Not Found");

    parsed_students = parsed_students.map((student, index) => {
      if (index == req.params.id) {
        student.gpa = req.body.gpa;
      }
      return student;
    });

    const output = JSON.stringify(parsed_students);
    await write(students_data, output);
    res.status(200).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

api.delete("/students/:id", async (req, res) => {
  try {
    const students = await read(students_data);
    let parsed_students = JSON.parse(students);

    const student = parsed_students.find((s, i) => i == req.params.id);

    if (!student) return res.status(404).send("Not Found");

    parsed_students = parsed_students.filter(
      (s, index) => index != req.params.id
    );

    const output = JSON.stringify(parsed_students);
    await write(students_data, output);

    res.status(204).send();
  } catch (error) {
    res.status(400).send();
  }
});

api.listen(3000, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log("Server started on port 3000");
});
