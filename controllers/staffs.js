const fs = require("fs");
// const { randomUUID } = require("crypto");
const {db} = require("../firebase");

// const getStaffsHandler = (req, res) => {
//   fs.readFile("./data/staff.json", (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(JSON.parse(data));
//     }
//   });
// };

const getStaffsHandler = async (req, res) => {
  try {
    const staffRef = db.collection("staff");
    const response = await staffRef.get();
    let responseArr = [];
    response.forEach(doc => {
      responseArr.push({...doc.data(), id: doc.id});
    });
    res.send(responseArr);
  } catch (error) {
    res.send(error);
  }
};

// const getSingleStaffHandler = (req, res) => {
//   fs.readFile("./data/staff.json", (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       const result = JSON.parse(data);
//       const staff = result.filter(
//         (s) => s.id.toString() === req.params.staffId
//       );
//       res.send(staff);
//     }
//   });
// };

const getSingleStaffHandler = async (req, res) => {
  try {
    const usersRef = db.collection("staff").doc(req.params.staffId);
    const response = await usersRef.get();
    res.send({...response.data(), id: response.id});
  } catch (error) {
    res.send(error);
  }
};

// const postStaffHandler = (req, res) => {
//   const newStaff = { ...req.body, id: randomUUID() };
//   fs.readFile("./data/staff.json", (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       const result = JSON.parse(data);
//       result.push(newStaff);
//       fs.writeFile("./data/staff.json", JSON.stringify(result), (err) => {
//         if (err) console.log(err);
//         else {
//           res.send(newStaff);
//         }
//       });
//     }
//   });
// };

const postStaffHandler = async (req, res) => {
  try {
    const newStaff = req.body;
    const response = await db.collection('staff').add(newStaff);
    res.send({...newStaff, id: response.id});
  } catch (error) {
    res.send(error);
  }
}

// const deleteStaffHandler = (req, res) => {
//   fs.readFile("./data/staff.json", (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       const result = JSON.parse(data);
//       const newStaffList = result.filter(staff => {
//         if (staff.id.toString() === req.params.staffId) {
//           return
//         } else return staff;
//       })
//       fs.writeFile("./data/staff.json", JSON.stringify(newStaffList), (err) => {
//         if (err) console.log(err);
//         else {
//           res.send({message: "Staff deleted"});
//         }
//       });
//     }
//   });
// };

const deleteStaffHandler = async (req, res) => {
  try {
    const response = await db.collection("staff").doc(req.params.staffId).delete();
    res.send(response);
  } catch (error) {
    res.send(error);
  }
}

// const updateStaffHandler = (req, res) => {
//   fs.readFile("./data/staff.json", (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       const result = JSON.parse(data);
//       const newStaffList = result.map(staff => {
//         if (staff.id.toString() === req.params.staffId) {
//           return req.body;
//         } else return staff;
//       })
//       fs.writeFile("./data/staff.json", JSON.stringify(newStaffList), (err) => {
//         if (err) console.log(err);
//         else {
//           res.send(req.body);
//         }
//       });
//     }
//   });
// };

const updateStaffHandler = async (req, res) => {
  try {
    const updatedStaff = req.body;
    const usersRef = await db.collection("staff").doc(req.params.staffId).update({
      ...updatedStaff
    });
    res.send(usersRef);
  } catch (error) {
    res.send(error);
  }
}

module.exports = {
  getStaffsHandler,
  getSingleStaffHandler,
  postStaffHandler,
  deleteStaffHandler,
  updateStaffHandler,
};
