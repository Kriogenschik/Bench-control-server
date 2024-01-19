const { db } = require("../firebase");

const getProjectsHandler = async (req, res) => {
  try {
    const response = await db.collection("projects").get();
    let responseArr = [];
    response.forEach(doc => {
      responseArr.push({...doc.data(), id: doc.id});
    });
    res.send(responseArr);
  } catch (error) {
    res.send(error);
  }
};

const getSingleProjectHandler = async (req, res) => {
  try {
    const response = await db.collection("projects").doc(req.params.staffId).get();
    res.send({ ...response.data(), id: response.id });
  } catch (error) {
    res.send(error);
  }
};

const postProjectHandler = async (req, res) => {
  try {
    const newProject = req.body;

    const response = await db.collection("projects").add(newProject);
    res.send({ ...newProject, id: response.id });
  } catch (error) {
    res.send(error);
  }
};

const deleteProjectHandler = async (req, res) => {
  try {
    const response = await db.collection("projects").doc(req.params.projectId).delete();
    res.send(response);
  } catch (error) {
    res.send(error);
  }
}

const updateProjectHandler = async (req, res) => {
  try {
    const updatedProject = req.body;
    delete updatedProject.id;
    const projectRef = await db
      .collection("projects")
      .doc(req.params.projectId)
      .update({
        ...updatedProject,
      });
    res.send(projectRef);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getProjectsHandler,
  getSingleProjectHandler,
  postProjectHandler,
  deleteProjectHandler,
  updateProjectHandler
};
