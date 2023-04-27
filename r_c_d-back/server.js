import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './router/userRouter.js';
import errorMiddleware from './middleware/error-middleware.js';

const { PORT } = process.env;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', router);
app.use(errorMiddleware);

(() => {
  try {
    app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
  } catch (e) {
    console.log(e);
  }
})();
