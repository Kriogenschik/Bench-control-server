const express = require("express");
const router = require('./routes/index');
const cors = require('cors');
const middleware = require('./middleware/index');
const mailing = require('./cron/cron')

const PORT = process.env.PORT || 5000;

const app = express();

// mailing.sendMail();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors());
// app.use(middleware.decodeToken);
app.use(router);

app.listen(PORT, () => console.log(`server is listening at port ${PORT}`));