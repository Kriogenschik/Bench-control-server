const fs = require("fs");
const {db} = require("../firebase");

// const getOptionsHandler = (req, res) => {
//   fs.readFile("./data/options.json", (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(JSON.parse(data));
//     }
//   });
// };

const getOptionsHandler = async (req, res) => {
  try {
    const optionsRef = db.collection("options");
    const response = await optionsRef.get();
    let responseArr = [];
    response.forEach(doc => {
      // console.log(doc.data().collection('arr').get());

      responseArr.push({...doc.data(), id: doc.id});
    });
    const opt = db.collection("options").doc("IakwNMr6edWbbCsM4AQ2").collection("arr");
    const optresponse = await opt.get();
    optresponse.forEach(doc => {
      console.log(doc.data());
    })
    
    res.send(responseArr);
  } catch (error) {
    res.send(error);
  }
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
