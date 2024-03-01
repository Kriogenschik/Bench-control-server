const db = require("../db");

const getStaffsHandler = async (req, res) => {
  try {
    const staff = await db.query(`SELECT * FROM get_all_employees()`);
    res.json(staff.rows);
  } catch (error) {
    res.send(error);
  }
};

const getSingleStaffHandler = async (req, res) => {
  const id = req.params.staffId;
  try {
    const staff = await db.query(`SELECT * FROM get_employee(${id})`);
    res.json(staff.rows);
  } catch (error) {
    res.send(error);
  }
};

const postStaffHandler = async (req, res) => {
  try {
    const {name, pos, stack, exp, speak, time} = req.body;
    const newStaff = await db.query(`SELECT * from create_employee('${name}', '${pos}', '${stack}', '${exp}', '${speak}', '${time}')`);
    res.json(newStaff.rows[0]);
  } catch (error) {
    res.send(error);
  }
}

const deleteStaffHandler = async (req, res) => {
  try {
    const deletedStaff = await db.query(`DELETE FROM employee WHERE id = $1 RETURNING employee.id`, [req.params.staffId]);
    res.send(deletedStaff.rows[0]);
  } catch (error) {
    res.send(error);
  }
};

const updateStaffHandler = async (req, res) => {
  try {
    const {id, name, pos, stack, exp, speak, time} = req.body;
    const editedStaff = await db.query(`SELECT * FROM update_employee(
      '${id}', '${name}', '${pos}', '${stack}', '${exp}', '${speak}', '${time}')`);
    res.send(editedStaff.rows[0]);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getStaffsHandler,
  getSingleStaffHandler,
  postStaffHandler,
  deleteStaffHandler,
  updateStaffHandler,
};
