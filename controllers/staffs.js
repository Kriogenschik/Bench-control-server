const {db} = require("../firebase.config");
const { doc, getDoc, getDocs, addDoc, deleteDoc, setDoc, collection } = require("firebase/firestore");


const getStaffsHandler = async (req, res) => {
  try {
    let responseArr = [];
    const staffsRef = collection(db, `staff`);
    const staffsSnapshot = await getDocs(staffsRef);
    staffsSnapshot.forEach((doc) => {
      responseArr.push({ ...doc.data(), id: doc.id });
    });
    res.send(responseArr);
  } catch (error) {
    res.send(error);
  }
};

const getSingleStaffHandler = async (req, res) => {
  try {
    const staffRef = doc(db, `staff/${req.params.staffId}`);
    const staff = await getDoc(staffRef);
    res.send({ ...staff.data(), id: staff.id });
  } catch (error) {
    res.send(error);
  }
};

const postStaffHandler = async (req, res) => {
  try {
    const newStaff = req.body;
    const response = await addDoc(collection(db, "staff"), newStaff);
    res.send({ ...newStaff, id: response.id });
  } catch (error) {
    res.send(error);
  }
};

const deleteStaffHandler = async (req, res) => {
  try {
    await deleteDoc(doc(db, 'staff', req.params.staffId));
    res.send({message: "staff was deleted"});
  } catch (error) {
    res.send(error);
  }
};

const updateStaffHandler = async (req, res) => {
  try {
    const updatedStaff = req.body;
    delete updatedStaff.id;
    
    const staffRef = doc(db, `staff/${req.params.staffId}`);
    setDoc(staffRef, updatedStaff);
    res.send(staffRef);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getStaffsHandler,
  getSingleStaffHandler,
  postStaffHandler,
  deleteStaffHandler,
  updateStaffHandler,
};
