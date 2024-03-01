const createProjectsList = (projectsList) => {
  try {
    const list = projectsList.map((project) => {
      return `<li 
                style="font-size: 14px;"
              >
                ${project.name}
              </li>`;
    });
    return `<ol 
              style="padding-left: 20px;"
            >
              ${list.join("")}
            </ol>`;
  } catch (error) {
    console.log(error);
  }
};

const createStaffList = (staffList) => {
  try {
    const list = staffList.map((staff) => {
      return `<li
                style="font-size: 14px;"
                >
                <span
                  style="display: inline-block;
                    width: 140px;
                    padding-right: 10px;"
                  >
                    ${staff.name}
                </span> 
                <span
                  style="display: inline-block;
                  width: 40px;
                  padding-right: 10px;"
                >
                  ${staff.pos}
                </span> 
                <span 
                  style="display: inline-block;"
                >
                  ${staff.freeAt}
                </span>
              </li>`;
    });
    return `<ol
              style="padding-left: 20px;"
              >
              ${list.join("")}
            </ol>`;
  } catch (error) {
    console.log(error);
  }
};

const createTemplate = (projectsList, staffList) => {
  let template = "";
  if (projectsList && projectsList.length > 0) {
    template += `<p
                  style="font-weight: 700;
                  font-size: 16px;"
                  >
                  Some projects are understaffed and must be edited:
                </p>
                ${createProjectsList(projectsList)}
                <br>`;
  }
  if (staffList && staffList.length > 0) {
    template += `<p
                  style="font-weight: 700;
                  font-size: 16px;"
                  >
                  Some employees are about to finish their project:
                </p>
                ${createStaffList(staffList)}`;
  }
  return template;
};

module.exports = { createTemplate };
