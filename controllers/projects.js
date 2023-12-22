const fs = require("fs");

const getProjectsHandler = (req, res) => {
  fs.readFile("./data.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.parse(data).projects);
    }
  });
};

const getSingleProjectHandler = (req, res) => {
  fs.readFile("./data.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const result = JSON.parse(data).projects;
      const project = result.filter((s) => s.id.toString() === req.params.projectId);
      res.send(project);
    }
  });
};

const postProjectHandler = (req, res) => res.send("Post Project route");
const deleteProjectHandler = (req, res) => res.send("Delete Project route");
const updateProjectHandler = (req, res) => res.send("Update Project route");


module.exports = {
  getProjectsHandler,
  getSingleProjectHandler,
  postProjectHandler,
  deleteProjectHandler,
  updateProjectHandler
};
