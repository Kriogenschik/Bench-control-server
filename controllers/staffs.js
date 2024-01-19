const { db } = require("../firebase");

const getStaffsHandler = async (req, res) => {
  try {
    const response = await db.collection("staff").get();
    let responseArr = [];
    response.forEach((doc) => {
      responseArr.push({ ...doc.data(), id: doc.id });
    });
    res.send(responseArr);
  } catch (error) {
    res.send(error);
  }
};

const getSingleStaffHandler = async (req, res) => {
  try {
    const response = await db.collection("staff").doc(req.params.staffId).get();
    res.send({ ...response.data(), id: response.id });
  } catch (error) {
    res.send(error);
  }
};

const postStaffHandler = async (req, res) => {
  try {
    const newStaff = req.body;
    const response = await db.collection("staff").add(newStaff);
    res.send({ ...newStaff, id: response.id });
  } catch (error) {
    res.send(error);
  }
};

const deleteStaffHandler = async (req, res) => {
  try {
    const response = await db
      .collection("staff")
      .doc(req.params.staffId)
      .delete();
    res.send(response);
  } catch (error) {
    res.send(error);
  }
};

const updateStaffHandler = async (req, res) => {
  try {
    const updatedStaff = req.body;
    
    delete updatedStaff.id;
    console.log(updatedStaff);
    const staffRef = await db
      .collection("staff")
      .doc(req.params.staffId)
      .update({
        ...updatedStaff,
      });
    res.send(staffRef);
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
