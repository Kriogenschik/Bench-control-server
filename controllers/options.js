const fs = require("fs");
const { db } = require("../firebase");

// const getOptionsHandler = (req, res) => {
//   fs.readFile("./data/options.json", (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(JSON.parse(data));
//     }
//   });
// };

const getOptionArray = async (id) => {
  try {
    const arr = [];
    const optionsArr = await db.collection("options").doc(id).collection("arr").get();
    optionsArr.forEach(doc => {
      arr.push({...doc.data(), id: doc.id});
    });
    return arr;
  } catch (error) {
    console.log(error);
  }
}

const getOptionsHandler = async (req, res) => {
  try {
    // const optionsRef = db.collection("options");
    // const response = await optionsRef.get();
    // let responseArr = [];
    // response.forEach( doc => {
    //   const opt = db.collection("options").doc(doc.id).collection("arr");
    //   // const optresponse = await opt.get();
    //   let arr = [];
    //   // optresponse.forEach(item => {
    //   //       arr.push({...item.data(), id: item.id});

    //   //   });
    //   //   console.log(arr);
    //   responseArr.push({...doc.data(), id: doc.id, arr: []});
    // });
    // responseArr.map( option => {
    //   const opt = db.collection("options").doc(option.id).collection("arr").get().
    //   // const optresponse =  opt.get();
    //   then(opt => {
    //     opt.forEach(doc => {
    //       option.arr.push({id: doc.id, ...doc.data()});
    //       console.log(option.arr + "<--");
    //     })

    //   })

    // //   optresponse.forEach(doc => {
    // //     option.arr.push({...doc.data(), id: doc.id});
    // //     console.log(option.arr);

    // // })
    // // option.arr = arr;
    // })
    // // console.log(responseArr);
    // let responseArr = [];
    // db.collection("options")
    //   .get()
    //   .then((options) => {
    //     options.forEach((doc) => {
    //       responseArr.push({ ...doc.data(), id: doc.id, arr: [] });
    //     });
    //     responseArr.map((item) => {
    //       db
    //         .collection("options")
    //         .doc(item.id)
    //         .collection("arr")
    //         .get()
    //         // const optresponse =  opt.get();
    //         .then((opt) => {
    //           opt.forEach((doc) => {
    //             item.arr.push({ id: doc.id, ...doc.data() });
    //             // item.test = "test";
    //             // console.log(option.arr + "<--");
    //           });
    //           // console.log(item);
    //           return "test"
    //         });
    //     });
    //     console.log(responseArr);
    //   });
    const optionsRef = db.collection("options");
    let result = [];
    let responseArr = [];

    const response = await optionsRef.get();

    response.forEach(doc => {
      responseArr.push({...doc.data(), id: doc.id, arr: []});
    });

    // responseArr.map(async option => {
    //   option.arr = await getOptionArray(option.id)
    // })
    // console.log(responseArr);
    // let test = [];
    // getOptionArray("bzO8QnNS5M1qZ2DxbtS6").then(res => {test.push(res); console.log(test);});
    // console.log(test);


      for (let opt  of responseArr) {
        opionsArr = await optionsRef.doc(opt.id).collection("arr").get();
        opionsArr.forEach(doc => {
          opt.arr.push({...doc.data(), id: doc.id,})
        });
      };

      console.log(responseArr);
  //     responseArr.map(async option => {
  //     res = await optionsRef.doc(option.id).collection("arr").get();
  //     res.forEach(opt => {
  //       option.arr.push({...opt.data(), id: opt.id,})
  //     });
  //      return responseArr; 
  // }).then(responseArr => res.send(responseArr))
    

    res.send(responseArr);
  } catch (error) {
    res.send(error);
  }

    // optionsRef.get().then((snapshot) => {
    //   snapshot.forEach((doc) => {
    //     responseArr.push({ ...doc.data(), id: doc.id, arr: [] });
    //   });
    //   return responseArr;
    // }).then(responseArr => {
    //   responseArr
    //   .forEach((option) => {
    //     optionsRef
    //       .doc(option.id)
    //       .collection("arr")
    //       .get()
    //       .then((opt) => {
    //         opt.forEach((item) => {
    //           option.arr.push({ ...item.data(), id: item.id,});
    //         });
    //         return option;
    //       }).then(() => res.send(responseArr));
    //       });
    //   })
    // ;
    

      // console.log(responseArr);
      //       return option;
      //     }). then((option) => {
      //       responseArr.map(opt => {
      //         if (opt.id === option.id) {
      //           opt.arr = option.arr
      //         }
      //       })
      //       return responseArr;
      //     }).then(responseArr => result = responseArr)
      // })
      // console.log(result);
      // })
      // Promise.all([
      //   optionsRef
      //   .get()
      //   .then((snapshot) => {
      //     snapshot.forEach((doc) => {
      //     responseArr.push({ ...doc.data(), id: doc.id, arr: [] });
      //     });
      //     return responseArr;
      //   })
      //   .then(responseArr => {
      //     responseArr.forEach(option => {
      //       optionsRef
      //         .doc(option.id)
      //         .collection("arr")
      //         .get()
      //         .then((opt) => {
      //           opt.forEach(item => {
      //             option.arr.push({ ...item.data(), id: item.id })
      //           })
      //         })
      //     })
      //     console.log(responseArr);
      //   })

      // ]).then(console.log("result =" + responseArr))

      // optionsRef
      //   .get()
      //   .then((snapshot) => {
      //     snapshot.forEach((doc) => {
      //       responseArr.push({ ...doc.data(), id: doc.id, arr: [] });
      //     });
      //     return responseArr;
      //   })
      // .then((responseArr) => {
      //   responseArr.map((option) => {
      //     optionsRef
      //       .doc(option.id)
      //       .collection("arr")
      //       .get()
      //       .then((opt) => {
      //         opt.forEach((item) => {
      //           option.arr.push({ ...item.data(), id: item.id });
      //         });
      //         return responseArr;
      //       }).then(responseArr => console.log(responseArr))
      //   });

      //   return responseArr;
      // })
      //     optionsRef
      //       .doc(doc.id)
      //       .collection("arr")
      //       .get()
      //       .then((opt) => {

      //         opt.forEach(item => {
      //           responseArr.map(o => {
      //             if (o.id === doc.id) {
      //               o.arr.push({ ...item.data(), id: item.id })
      //             }
      //           });
      //         })
      //         return responseArr;
      //       }).then(responseArr => {console.log(responseArr);result = responseArr});
      //   });
      //   console.log(result);
      //   return responseArr;

      // })
      // .then(() => {
      //   responseArr.forEach(doc => {
      //     optionsRef
      //     .doc(doc.id)
      //     .collection("arr")
      //     .get()
      //     .then((snapshot) => {
      //       let arr = [];
      //       snapshot.forEach((opt) => {
      //         arr.push({ ...opt.data(), id: opt.id });
      //       });
      //       responseArr.forEach((item) => {
      //         if (item.id === doc.id) {
      //           item.arr = arr;
      //         }
      //       });
      //       console.log(responseArr);
      //     })
      //     .catch((err) => {
      //       console.log("Error getting sub-collection documents", err);
      //     });
      //   })

      // })

      // optionsRef
      //   .get()
      //   .then((snapshot) => {
      //     snapshot.forEach((doc) => {
      //       responseArr.push({ ...doc.data(), id: doc.id, arr: [] });
      //       optionsRef
      //         .doc(doc.id)
      //         .collection("arr")
      //         .get()
      //         .then((opt) => {

      //           opt.forEach(item => {
      //             responseArr.map(o => {
      //               if (o.id === doc.id) {
      //                 o.arr.push({ ...item.data(), id: item.id })
      //               }
      //             });
      //           })
      //           return responseArr;
      //         }).then(responseArr => {console.log(responseArr);result = responseArr});
      //     });
      //     console.log(result);
      //     return responseArr;

      //   })
      //   .then(() => {
      //     responseArr.forEach(doc => {
      //       optionsRef
      //       .doc(doc.id)
      //       .collection("arr")
      //       .get()
      //       .then((snapshot) => {
      //         let arr = [];
      //         snapshot.forEach((opt) => {
      //           arr.push({ ...opt.data(), id: opt.id });
      //         });
      //         responseArr.forEach((item) => {
      //           if (item.id === doc.id) {
      //             item.arr = arr;
      //           }
      //         });
      //         console.log(responseArr);
      //       })
      //       .catch((err) => {
      //         console.log("Error getting sub-collection documents", err);
      //       });
      //     })

      //   })
      // .catch((err) => {
      //   console.log("Error getting documents", err);
      // })
      // .finally(() => {
        // res.send(responseArr);
      // });
  // } catch (error) {
  //   res.send(error);
  // }
};

const getSingleOptionHandler = (req, res) => {
  fs.readFile("./data/options.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const result = JSON.parse(data);
      const option = result.filter(
        (s) => s.id.toString() === req.params.optionId
      );
      res.send(option);
    }
  });
};

const updateOptionHandler = (req, res) => {
  fs.readFile("./data/options.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const result = JSON.parse(data);
      const newOptionsList = result.map((option) => {
        if (option.id.toString() === req.params.optionId) {
          return { ...option, arr: req.body.arr };
        } else return option;
      });
      fs.writeFile(
        "./data/options.json",
        JSON.stringify(newOptionsList),
        (err) => {
          if (err) console.log(err);
          else {
            res.send(req.body);
          }
        }
      );
    }
  });
};

module.exports = {
  getOptionsHandler,
  getSingleOptionHandler,
  updateOptionHandler,
};
