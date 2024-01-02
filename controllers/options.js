const fs = require("fs");

const getOptionsHandler = (req, res) => {
  fs.readFile("./data/options.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.parse(data));
    }
  });
};

const getSingleOptionHandler = (req, res) => {
  fs.readFile("./data/options.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const result = JSON.parse(data);
      const option = result.filter((s) => s.id.toString() === req.params.optionId);
      res.send(option);
    }
  });
};

const postOptionHandler = (req, res) => res.send("Post Option route");

const updateOptionHandler = (req, res) => res.send("Update Staff route");

module.exports = {
  getOptionsHandler,
  getSingleOptionHandler,
  postOptionHandler,
  updateOptionHandler
};
