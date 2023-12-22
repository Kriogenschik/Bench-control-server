const fs = require("fs");

const getStaffsHandler = (req, res) => {
  fs.readFile("./data.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.parse(data).staffs);
    }
  });
};

const getSingleStaffHandler = (req, res) => {
  fs.readFile("./data.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const result = JSON.parse(data).staffs;
      const staff = result.filter((s) => s.id.toString() === req.params.staffId);
      res.send(staff);
    }
  });
};

const postStaffHandler = (req, res) => res.send("Post Staff route");

const deleteStaffHandler = (req, res) => res.send("Delete Staff route");

const updateStaffHandler = (req, res) => res.send("Update Staff route");


module.exports = {
  getStaffsHandler,
  getSingleStaffHandler,
  postStaffHandler,
  deleteStaffHandler,
  updateStaffHandler,
};
