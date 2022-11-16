require('dotenv').config();   // eslint-disable-line
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const start = async () => {
  try {
    app.listen(5000, () => console.log(`[server]: Server is running at http://localhost:${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
