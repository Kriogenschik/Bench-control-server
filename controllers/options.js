const db = require("../db");

const getOptionsHandler = async (req, res) => {
  try {
    const result = await db.query(`
  select  option_id as id, name from option`);
    let options = result.rows;
    for (let option of options) {
      const result = await db.query(
        `select ${option.name}_id as id, value, label, descr from ${option.name}`
      );
      option.arr = result.rows;
    }
    res.json(options);
  } catch (error) {
    console.log(error);
  }
};

const getSingleOptionHandler = async (req, res) => {
  try {
    const optionRef = doc(db, `options/${req.params.optionId}`);
    const option = await getDoc(optionRef);
    res.send({ ...option.data(), id: option.id });
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getOptionsHandler,
  // getSingleOptionHandler,
  // deleteOptionHandler,
  // updateOptionHandler,
};
