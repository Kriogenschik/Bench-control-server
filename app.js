const express = require("express");
const router = require('./routes/index');
const cors = require('cors');
const passport = require('passport');



const PORT = process.env.PORT || 5000;

// app.use(passport.initialize());
// app.use(passport.session());

// require('./config/passport')(passport);

const app = express();

app.use(express.urlencoded({extended: true}));

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(PORT, () => console.log(`server is listening at port ${PORT}`));