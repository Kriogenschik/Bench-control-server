const {db} = require("../firebase.config");
const { doc, getDoc, getDocs, addDoc, deleteDoc, setDoc, collection } = require("firebase/firestore");

const getProjectsHandler = async (req, res) => {
  try {
    let responseArr = [];
    const projectsRef = collection(db, `projects`);
    const projectsSnapshot = await getDocs(projectsRef);
    projectsSnapshot.forEach((doc) => {
      responseArr.push({ ...doc.data(), id: doc.id });
    });
    res.send(responseArr);
  } catch (error) {
    res.send(error);
  }
};

const getSingleProjectHandler = async (req, res) => {
  try {
    const projectRef = doc(db, `projects/${req.params.projectId}`);
    const project = await getDoc(projectRef);
    res.send({ ...project.data(), id: project.id });
  } catch (error) {
    res.send(error);
  }
};

const postProjectHandler = async (req, res) => {
  try {
    const newProject = req.body;
    const response = await addDoc(collection(db, "projects"), newProject);
    res.send({ ...newProject, id: response.id });
  } catch (error) {
    res.send(error);
  }
};

const deleteProjectHandler = async (req, res) => {
  try {
    await deleteDoc(doc(db, 'projects', req.params.projectId));
    res.send({message: "project was deleted"});
  } catch (error) {
    res.send(error);
  }
}

const updateProjectHandler = async (req, res) => {
  try {
    const updatedProject = req.body;
    delete updatedProject.id;
    
    const projectRef = doc(db, `projects/${req.params.projectId}`);
    setDoc(projectRef, updatedProject);
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
