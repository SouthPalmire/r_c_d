import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './router/userRouter.js';

const { PORT } = process.env;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', router);

(() => {
  try {
    app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
  } catch (e) {
    console.log(e);
  }
})();
