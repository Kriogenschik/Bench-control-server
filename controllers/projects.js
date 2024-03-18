const db = require("../db");

const getEmployeesInProj = async (proj_id) => {
  const result = await db.query(
    `SELECT id, name, pos, time, TO_CHAR("start", 'YYYY-MM-DD') AS "start", TO_CHAR("end", 'YYYY-MM-DD') AS "end", billing_type AS "billingType" FROM get_employees_in_project(${proj_id})`
  );
  return result.rows;
};

const getEmployeesData = (project, proj_id, role, result) => {
  let str = "";
  if (
    project[role] &&
    (Object.keys(project[role]).length > 0 || project[role].length > 0)
  ) {
    if (Array.isArray(project[role])) {
      project[role].forEach((employee) => {
        if (result.length > 0) {
          str += ", ";
        }
        str += `(${employee.id}, ${proj_id}, '${
          role === "devs" ? "dev" : "qa"
        }', ${employee.time}, '${employee.billingType}')`;
      });
    } else {
      if (result.length > 0) {
        str += ", ";
      }
      str += `(${project[role].id}, ${proj_id}, '${role}', ${project[role].time}, '${project[role].billingType}')`;
    }
  }
  return str;
};

const getAllEmployeesData = (project, proj_id) => {
  let result = "";
  result += getEmployeesData(project, proj_id, "lead", result);
  result += getEmployeesData(project, proj_id, "ba", result);
  result += getEmployeesData(project, proj_id, "pm", result);
  result += getEmployeesData(project, proj_id, "devs", result);
  result += getEmployeesData(project, proj_id, "qas", result);

  return result;
};

const getFullProject = async (id) => {
  const result = await db.query(`
      SELECT  id,
              name,
              TO_CHAR("start", 'YYYY-MM-DD') AS "start",
              TO_CHAR("end", 'YYYY-MM-DD') AS "end",
              isactive AS "isActive"
      FROM projects
      WHERE projects.id = ${id}`);
  const project = result.rows[0];
  const staffList = await getEmployeesInProj(id);
  project.lead = staffList.filter((staff) => staff.pos === "lead")[0] || {};
  project.pm = staffList.filter((staff) => staff.pos === "pm")[0] || {};
  project.ba = staffList.filter((staff) => staff.pos === "ba")[0] || {};
  project.devs = staffList.filter((staff) => staff.pos === "dev") || {};
  project.qas = staffList.filter((staff) => staff.pos === "qa") || {};

  return project;
};

const getProjectsHandler = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT  id,
              name,
              TO_CHAR("start", 'YYYY-MM-DD') AS "start",
              TO_CHAR("end", 'YYYY-MM-DD') AS "end",
              isactive AS "isActive"
      FROM projects
      ORDER BY projects.id`);

    let projects = result.rows;
    for (let project of projects) {
      const staffList = await getEmployeesInProj(project.id);
      project.lead = staffList.filter((staff) => staff.pos === "lead")[0] || {};
      project.pm = staffList.filter((staff) => staff.pos === "pm")[0] || {};
      project.ba = staffList.filter((staff) => staff.pos === "ba")[0] || {};
      project.devs = staffList.filter((staff) => staff.pos === "dev") || {};
      project.qas = staffList.filter((staff) => staff.pos === "qa") || {};
    }

    res.json(projects);
  } catch (error) {
    console.log(error);
  }
};

const postProjectHandler = async (req, res) => {
  try {
    const newProject = req.body;
    const reqId = await db.query(`
      INSERT INTO projects (name, "start", "end", isactive)
      VALUES ('${newProject.name}', '${newProject.start}', '${newProject.end}', ${newProject.isActive})
      RETURNING projects.id
    `);

    const id = reqId.rows[0].id;

    const projectEmployees = getAllEmployeesData(newProject, id);
    await db.query(`
      INSERT INTO employee_in_projects (employee_id, project_id, position, "time", billing_type)
      VALUES ${projectEmployees}
    `);

    const project = await getFullProject(id);
    res.json(project);
  } catch (error) {
    res.send(error);
  }
};

const deleteProjectHandler = async (req, res) => {
  try {
    const deletedId = await db.query(
      `SELECT * FROM delete_project(${req.params.projectId})`
    );
    res.send({ id: deletedId.rows[0].delete_project });
  } catch (error) {
    res.send(error);
  }
};

const updateProjectHandler = async (req, res) => {
  try {
    const updatedProject = req.body;
    const id = req.params.projectId;
    await db.query(`
    UPDATE projects SET "start" = '${updatedProject.start}',
    "end" = '${updatedProject.end}',
    isactive = '${updatedProject.isActive}'
    WHERE projects.id = ${id}
    `);
    await db.query(`DELETE FROM employee_in_projects WHERE project_id = ${id}`);

    const projectEmployees = getAllEmployeesData(updatedProject, id);

    await db.query(`
      INSERT INTO employee_in_projects (employee_id, project_id, position, "time", billing_type)
      VALUES ${projectEmployees}
    `);

    const project = await getFullProject(id);
    res.json(project);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getProjectsHandler,
  postProjectHandler,
  deleteProjectHandler,
  updateProjectHandler,
};
