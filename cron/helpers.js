const { db } = require("../firebase.config");
const { getDocs, collection } = require("firebase/firestore");

const getData = async (dataType) => {
  try {
    let responseArr = [];
    const dataRef = collection(db, dataType);
    const dataSnapshot = await getDocs(dataRef);
    dataSnapshot.forEach((doc) => {
      responseArr.push({ ...doc.data(), id: doc.id });
    });
    return responseArr;
  } catch (error) {
    console.log(error);
  }
};

const getBlankProjectsList = async () => {
  try {
    const allprojects = await getData("projects");
    return allprojects.filter(
      (project) => (project.isActive && (!project.lead?.name || !project.ba?.name || !project.pm?.name))
    );
  } catch (error) {
    console.log(error);
  }
};

const getActualStaffList = async () => {
  try {
    const allprojects = await getData("projects");
    const allstaff = await getData("staff");

    let staffBenchList = [];
    if (allstaff && allprojects) {
      staffBenchList = allstaff.map((staff) => {
        const actualProjects = [];
        proj: for (let project of allprojects) {
          if (project.isActive) {
            if (
              project.lead.id === staff.id ||
              project.ba.id === staff.id ||
              project.pm.id === staff.id
            ) {
              actualProjects.push(project);
            } else {
              for (let dev of project.devs) {
                if (dev.id === staff.id) {
                  actualProjects.push(project);
                  continue proj;
                }
              }
              for (let qa of project.qas) {
                if (qa.id === staff.id) {
                  actualProjects.push(project);
                  continue proj;
                }
              }
            }
          }
        }

        let endTime = "";
        if (actualProjects.length) {
          actualProjects.forEach((proj) => {
            if (proj.end > endTime) {
              endTime = proj.end;
            }
          });
        } else endTime = "none";

        const setColor = () => {
          if (endTime === "none") {
            return "grey";
          }
          const daysLeft = Math.round(
            (+new Date(endTime) - +new Date()) / 1000 / 60 / 60 / 24
          );
          if (daysLeft < 0) return "grey";
          else if (daysLeft < 14) return "red";
          else if (daysLeft < 30) return "yellow";
          else return "green";
        };

        return {
          ...staff,
          projCount: actualProjects.length,

          freeAt: endTime.slice(-2) + "." + endTime.slice(5, 7) + "." + endTime.slice(0, 4),
          color: setColor(),
        };
      });
    }
    return staffBenchList;
  } catch (error) {
    console.log(error);
  }
};

const getStaffListByTimeZone = async () => {
  try {
    const actualStaffList = await getActualStaffList();
    return actualStaffList.filter((staff) => staff.color === "red");
  } catch (error) {
    console.log(error);
  }
};

const getUserEmailsArr = async () => {
  try {
    let emailsArr = [];
    const emailsList = await getData("emails");
    emailsList.forEach(emails => {
      emailsArr.push(emails.email);
    });
    return emailsArr;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getBlankProjectsList, getStaffListByTimeZone, getUserEmailsArr };
