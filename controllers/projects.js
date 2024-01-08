const fs = require("fs");
const { randomUUID } = require("crypto");

const getProjectsHandler = (req, res) => {
  fs.readFile("./data/projects.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.parse(data));
    }
  });
};

const getSingleProjectHandler = (req, res) => {
  fs.readFile("./data/projects.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const result = JSON.parse(data);
      const project = result.filter((s) => s.id.toString() === req.params.projectId);
      res.send(project);
    }
  });
};

const postProjectHandler = (req, res) => {
  const newProject = { ...req.body, id: randomUUID() };
  fs.readFile("./data/projects.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const result = JSON.parse(data);
      result.push(newProject);
      fs.writeFile("./data/projects.json", JSON.stringify(result), (err) => {
        if (err) console.log(err);
        else {
          res.send(newProject);
        }
      });
    }
  });
};

const deleteProjectHandler = (req, res) => {
  fs.readFile("./data/projects.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const result = JSON.parse(data);
      const newProjectList = result.filter(project => {
        if (project.id.toString() === req.params.projectId) {
          return
        } else return project;
      })
      fs.writeFile("./data/projects.json", JSON.stringify(newProjectList), (err) => {
        if (err) console.log(err);
        else {
          res.send({message: "Project deleted"});
        }
      });
    }
  });
};

const updateProjectHandler = (req, res) => {
  fs.readFile("./data/projects.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const result = JSON.parse(data);
      const newProjectList = result.map(project => {
        if (project.id.toString() === req.params.projectId) {
          return req.body;
        } else return project;
      })
      fs.writeFile("./data/projects.json", JSON.stringify(newProjectList), (err) => {
        if (err) console.log(err);
        else {
          res.send(req.body);
        }
      });
    }
  });
};

module.exports = {
  getProjectsHandler,
  getSingleProjectHandler,
  postProjectHandler,
  deleteProjectHandler,
  updateProjectHandler
};
