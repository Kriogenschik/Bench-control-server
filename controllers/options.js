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

const updateOptionHandler = (req, res) => {
  fs.readFile("./data/options.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const result = JSON.parse(data);
      const newOptionsList = result.map(option => {
        if (option.id.toString() === req.params.optionId) {
          return {...option, arr: req.body.arr};
        } else return option;
      })
      fs.writeFile("./data/options.json", JSON.stringify(newOptionsList), (err) => {
        if (err) console.log(err);
        else {
          res.send(req.body);
        }
      });
    }
  });
};

module.exports = {
  getOptionsHandler,
  getSingleOptionHandler,
  updateOptionHandler
};
