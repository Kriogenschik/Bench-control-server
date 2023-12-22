const express = require("express");
const router = require('./routes/index');
const cors = require('cors');

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(PORT, () => console.log(`server is listening at port ${PORT}`));