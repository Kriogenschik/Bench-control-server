const db = require("../db");

const getOptionsHandler = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT  option_id AS id, name, title FROM option`);
    let options = result.rows;
    for (let option of options) {
      const result = await db.query(`
        SELECT ${option.name}_id AS id, value, label, descr FROM ${option.name}
        ORDER BY ${option.name}_id
        `
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
    const result = await db.query(`
      SELECT  option_id AS id, name, title FROM option WHERE option_id = ${req.params.optionId}`);
    let option = result.rows[0];
    const resultArr = await db.query(
      `SELECT ${option.name}_id AS id, value, label, descr FROM ${option.name}`
    );
    option.arr = resultArr.rows;
    res.json(option);
  } catch (error) {
    res.send(error);
  }
};

const addNewOptionHandler = async (req, res) => {
  try {
    const { optionName, descr, label, value } = req.body;

    await db.query(`
      INSERT INTO ${optionName} (option_id, value, label, descr)
      VALUES ('${req.params.optionId}', '${value}', '${label}', '${descr}')
    `);
    const result = await db.query(`
      SELECT  option_id AS id, name, title FROM option WHERE option_id = ${req.params.optionId}`);
    let option = result.rows[0];
    const resultArr = await db.query(
      `SELECT ${option.name}_id AS id, value, label, descr FROM ${option.name}`
    );
    option.arr = resultArr.rows;
    res.json(option);
  } catch (error) {
    res.send(error);
  }
};

const deleteOptionHandler = async (req, res) => {
  try {
    const {optionName, id} = req.body;
    await db.query(`
      DELETE FROM ${optionName} WHERE ${optionName}_id = ${id}
    `);
    const result = await db.query(`
      SELECT option_id AS id, name, title FROM option WHERE option_id = ${req.params.optionId}`);
    let option = result.rows[0];
    const resultArr = await db.query(
      `SELECT ${option.name}_id AS id, value, label, descr FROM ${option.name}`
    );
    option.arr = resultArr.rows;
    res.json(option);
  } catch (error) {
    res.send(error);
  }
};

const updateOptionHandler = async (req, res) => {
  try {
    const { optionsName, id, name, value } = req.body;
    await db.query(`
      UPDATE ${optionsName} SET value = '${value}',
                                label = '${value}',
                                descr = '${name}'
      WHERE ${optionsName}_id = ${id}
    `);

    const result = await db.query(`
      SELECT  option_id AS id, name, title FROM option WHERE option_id = ${req.params.optionId}`);
    let option = result.rows[0];
    const resultArr = await db.query(
      `SELECT ${option.name}_id AS id, value, label, descr FROM ${option.name}
      ORDER BY ${option.name}_id`
    );
    option.arr = resultArr.rows;
    res.json(option);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getOptionsHandler,
  getSingleOptionHandler,
  deleteOptionHandler,
  addNewOptionHandler,
  updateOptionHandler
};