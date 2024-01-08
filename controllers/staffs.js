const fs = require("fs");
const { randomUUID } = require("crypto");

const getStaffsHandler = (req, res) => {
  fs.readFile("./data/staff.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.parse(data));
    }
  });
};

const getSingleStaffHandler = (req, res) => {
  fs.readFile("./data/staff.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const result = JSON.parse(data);
      const staff = result.filter(
        (s) => s.id.toString() === req.params.staffId
      );
      res.send(staff);
    }
  });
};

const postStaffHandler = (req, res) => {
  const newStaff = { ...req.body, id: randomUUID() };
  fs.readFile("./data/staff.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const result = JSON.parse(data);
      result.push(newStaff);
      fs.writeFile("./data/staff.json", JSON.stringify(result), (err) => {
        if (err) console.log(err);
        else {
          res.send(newStaff);
        }
      });
    }
  });
};

const deleteStaffHandler = (req, res) => {
  fs.readFile("./data/staff.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const result = JSON.parse(data);
      const newStaffList = result.filter(staff => {
        if (staff.id.toString() === req.params.staffId) {
          return
        } else return staff;
      })
      fs.writeFile("./data/staff.json", JSON.stringify(newStaffList), (err) => {
        if (err) console.log(err);
        else {
          res.send({message: "Staff deleted"});
        }
      });
    }
  });
};

const updateStaffHandler = (req, res) => {
  fs.readFile("./data/staff.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const result = JSON.parse(data);
      const newStaffList = result.map(staff => {
        if (staff.id.toString() === req.params.staffId) {
          return req.body;
        } else return staff;
      })
      fs.writeFile("./data/staff.json", JSON.stringify(newStaffList), (err) => {
        if (err) console.log(err);
        else {
          res.send(req.body);
        }
      });
    }
  });
};

module.exports = {
  getStaffsHandler,
  getSingleStaffHandler,
  postStaffHandler,
  deleteStaffHandler,
  updateStaffHandler,
};
