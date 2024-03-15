const db = require("../db");

const createEmployeeReq = (id, role) => {
  return `SELECT id, name, time, TO_CHAR("start", 'YYYY-MM-DD') AS "start", TO_CHAR("end", 'YYYY-MM-DD') AS "end", billingtype AS "billingType" FROM get_employees_in_project_by_role(${id}, '${role}')`
}

const getProjectsHandler = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT  id, name, TO_CHAR("start", 'YYYY-MM-DD') AS "start", TO_CHAR("end", 'YYYY-MM-DD') AS "end", isactive AS "isActive" FROM projects`);
      
    let projects = result.rows;
    for (let project of projects) {
      const lead = await db.query(createEmployeeReq(project.id, "lead"));
      project.lead = lead.rows[0] || {};
      const pm = await db.query(createEmployeeReq(project.id, "pm"));
      project.pm = pm.rows[0] || {};
      const ba = await db.query(createEmployeeReq(project.id, "ba"));
      project.ba = ba.rows[0] || {};
      const devs = await db.query(createEmployeeReq(project.id, "dev"));
      project.devs = devs.rows || {};
      const qas = await db.query(createEmployeeReq(project.id, "qa"));
      project.qas = qas.rows || {};
    }
    res.json(result.rows)
  } catch (error) {
    console.log(error);
  }
};

const getSingleProjectHandler = async (req, res) => {
  try {
    const id = req.params.projectId;
    const result = await db.query(`
      SELECT  id, name, TO_CHAR("start", 'YYYY-MM-DD') AS "start", TO_CHAR("end", 'YYYY-MM-DD') AS "end", isactive AS "isActive"
      FROM projects
      WHERE projects.id = ${id}`);
    const project = result.rows[0]
    const lead = await db.query(createEmployeeReq(id, "lead"));
    project.lead = lead.rows[0] || {};
    const pm = await db.query(createEmployeeReq(id, "pm"));
    project.pm = pm.rows[0] || {};
    const ba = await db.query(createEmployeeReq(id, "ba"));
    project.ba = ba.rows[0] || {};
    const devs = await db.query(createEmployeeReq(id, "dev"));
    project.devs = devs.rows || {};
    const qas = await db.query(createEmployeeReq(id, "qa"));
    project.qas = qas.rows || {};
    res.json(project)
  } catch (error) {
    res.send(error);
  }
};

const postProjectHandler = async (req, res) => {
  try {
    const newProject = req.body;
    await db.query(`
      INSERT INTO projects (name, "start", "end", isactive)
      VALUES ('${newProject.name}', '${newProject.start}', '${newProject.end}', ${newProject.isActive})
    `);
    // console.log(newProject);
  } catch (error) {
    res.send(error);
  }
};

const deleteProjectHandler = async (req, res) => {
  try {
    const deletedId = await db.query(`SELECT * FROM deleted_project(${req.params.projectId})`);
    res.send({id: deletedId.rows[0].deleted_project});
  } catch (error) {
    res.send(error);
  }
}

// const updateProjectHandler = async (req, res) => {
//   try {
//     const updatedProject = req.body;
//     delete updatedProject.id;
    
//     const projectRef = doc(db, `projects/${req.params.projectId}`);
//     setDoc(projectRef, updatedProject);
//     res.send(projectRef);
//   } catch (error) {
//     res.send(error);
//   }
// };

module.exports = {
  getProjectsHandler,
  getSingleProjectHandler,
  postProjectHandler,
  deleteProjectHandler,
  // updateProjectHandler
};


//TODO update post method