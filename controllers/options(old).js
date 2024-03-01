// const { db } = require("../firebase");
const {db} = require("../firebase.config");
const { doc, getDoc, getDocs, deleteDoc, setDoc, collection } = require("firebase/firestore");

// For options with sub-collections in firebase
//=======================================================================
// const getOptionsHandler = async (req, res) => {
//   try {
//     const optionsRef = db.collection("options");
//     let responseArr = [];

//     const response = await optionsRef.get();

//     response.forEach((doc) => {
//       responseArr.push({ ...doc.data(), id: doc.id, arr: [] });
//     });

//     for (let opt of responseArr) {
//       opionsArr = await optionsRef.doc(opt.id).collection("arr").get();
//       opionsArr.forEach((doc) => {
//         opt.arr.push({ ...doc.data(), id: doc.id });
//       });
//     }

//     res.send(responseArr);
//   } catch (error) {
//     res.send(error);
//   }
// };

// const getSingleOptionHandler = async (req, res) => {
//   try {
//     const optionRef = db.collection("options").doc(req.params.optionId);
//     let responseArr = {};

//     const response = await optionRef.get();
//     responseArr = { ...response.data(), id: response.id, arr: [] };

//     opionsArr = await optionRef.collection("arr").get();
//     opionsArr.forEach((doc) => {
//       responseArr.arr.push({ ...doc.data(), id: doc.id });
//     });
//     res.send(responseArr);
//   } catch (error) {
//     res.send(error);
//   }
// };

// const postOptionHandler = async (req, res) => {
//   try {
//     const newOption = req.body;
//     const response = await db
//       .collection("options")
//       .doc(req.params.optionId)
//       .collection("arr")
//       .add(newOption);
//     res.send({ ...newOption, id: response.id });
//   } catch (error) {
//     res.send(error);
//   }
// };

// const deleteOptionHandler = async (req, res) => {
//   try {
//     const response = db
//       .collection("options")
//       .doc(req.params.optionId)
//       .collection("arr")
//       .doc(req.body.id)
//       .delete();
//     res.send(response);
//   } catch (error) {
//     res.send(error);
//   }
// };

// const updateOptionHandler = async (req, res) => {
//   try {
//     const updatedOption = req.body;
//     const id = updatedOption.id;
//     delete updatedOption.id;

//     const optionsRef = await db
//       .collection("options")
//       .doc(req.params.optionId)
//       .collection("arr")
//       .doc(id)
//       .update({
//         ...updatedOption,
//       });
//     res.send(optionsRef);
//   } catch (error) {
//     res.send(error);
//   }
// };
//========================================================================
const getOptionsHandler = async (req, res) => {
  try {
    let responseArr = [];
    const optionsRef = collection(db, `options`);
    const optionsSnapshot = await getDocs(optionsRef);
    optionsSnapshot.forEach((doc) => {
      responseArr.push({ ...doc.data(), id: doc.id });
    });
    res.send(responseArr);
  } catch (error) {
    res.send(error);
  }
};

const getSingleOptionHandler = async (req, res) => {
  try {
    const optionRef = doc(db, `options/${req.params.optionId}`);
    const option = await getDoc(optionRef);
    res.send({ ...option.data(), id: option.id });
  } catch (error) {
    res.send(error);
  }
};

const deleteOptionHandler = async (req, res) => {
  try {
    await deleteDoc(doc(db, 'options', req.params.optionId));
    res.send({message: "option was deleted"});
  } catch (error) {
    res.send(error);
  }
}

const updateOptionHandler = async (req, res) => {
  try {
    const updatedOptions = req.body;
    delete updatedOptions.id;
    
    const optionsRef = doc(db, `options/${req.params.optionId}`);
    setDoc(optionsRef, updatedOptions, { merge: true });
    res.send(optionsRef);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getOptionsHandler,
  getSingleOptionHandler,
  deleteOptionHandler,
  updateOptionHandler,
};
