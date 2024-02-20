const {db, auth} = require("../firebase.config");

const {signInWithEmailAndPassword} = require("firebase/auth")


const testSignIn = async (req, res) => {
  console.log("test");
  try {
    signInWithEmailAndPassword(auth, "user@user.com", "useruser")
    .then((userCred) => res.json(userCred))
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  testSignIn
};

//12: 54
// eyJhbGciOiJSUzI1NiIsImtpZCI6ImFlYzU4NjcwNGNhOTZiZDcwMzZiMmYwZDI4MGY5NDlmM2E5NzZkMzgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYmVuY2gtY29udHJvbCIsImF1ZCI6ImJlbmNoLWNvbnRyb2wiLCJhdXRoX3RpbWUiOjE3MDgzNDAwMTgsInVzZXJfaWQiOiIyckd0NFNjOWt4UEVMTWlBdTRWMGl3dGM0WG0xIiwic3ViIjoiMnJHdDRTYzlreFBFTE1pQXU0VjBpd3RjNFhtMSIsImlhdCI6MTcwODM0MDAxOCwiZXhwIjoxNzA4MzQzNjE4LCJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidXNlckB1c2VyLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.JlXYQjNV6E94VYGg8Ib-0RuyxdgGYTDgKEveBgBe2gmSKYvkbaLGcdvXUEzPNEOdtVmyyMzwmykDxEOOukR3Gb6vfPPSlJzXlvRGZirAocpozNF2yNwcbu269CayNuB34hMyNqo1cnFhR-3cJWNGsgPoBecrs4KijZrSvpgebnY1pR9URJl60vED8XpwjJ4g4-8NroKw8T82XR4XV-RHXBvuw9RZCv0FsA6mpFXba_u5ukMgjVclbP7LCsrdlF0cRy4y5PF93yRoerM420CFXxfskeSNtyI6ihYcJpb0GxMPMxJPYJCt2gr6c8AX8qublF7w5M0k9m-xwry8aChlsw