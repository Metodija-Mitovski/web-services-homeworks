const fs = require("fs");
const config = require("../../../pkg/config");
const strings = require("../../../pkg/strings");

const upload = async (req, res) => {
  if (req.files.document.size > config.get("storage").max_filesize) {
    return res.status(400).send("File exceeds max file size");
  }

  if (
    !config
      .get("storage")
      .allowed_filetypes.includes(req.files.document.mimetype)
  ) {
    return res.status(400).send("Filetype not allowed");
  }

  let userDir = `user_${req.user.uid}`;
  let userDirPath = `${__dirname}/../../../${
    config.get("storage").upload_dir
  }/${userDir}`;

  if (!fs.existsSync(userDirPath)) {
    fs.mkdirSync(userDirPath);
  }

  let fileID = strings.makeID(6);
  let fileName = `${fileID}_${req.files.document.name}`;
  let filePath = `${userDirPath}/${fileName}`;
  req.files.document.mv(filePath, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }
    res.status(200).send({ filename: fileName });
  });
};

const download = async (req, res) => {
  let userDir = `user_${req.user.uid}`;
  let userDirPath = `${__dirname}/../../../${
    config.get("storage").upload_dir
  }/${userDir}`;
  let filePath = `${userDirPath}/${req.params.filename}`;

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("Not Found");
  }
  res.download(filePath);
};

const getFileList = (req, res) => {
  try {
    fs.readdir(
      `${__dirname}/../../../${config.get("storage").upload_dir}/user_${
        req.user.uid
      }`,
      (err, files) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        res.status(200).send(files);
      }
    );
  } catch (error) {
    return res.status(500).send();
  }
};

const removeFile = (req, res) => {
  try {
    const filePath = `${__dirname}/../../../${
      config.get("storage").upload_dir
    }/user_${req.user.uid}/${req.params.filename}`;

    if (!fs.existsSync(filePath)) {
      return res.status(404).send("Not Found");
    }

    fs.unlinkSync(filePath);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  upload,
  download,
  getFileList,
  removeFile,
};
