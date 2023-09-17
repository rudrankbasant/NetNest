import  express, { Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan'; 
const app = express();
import authRouter from "./router/AuthRouter";
import userRouter from './router/UserRouter';
import postRouter from './router/PostRouter';

require("dotenv").config();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("common"));

app.get("/", (req: Request, res: Response) => {
    return res.status(200).json({
      status : 'online'
    })
});

app.use("/api/auth", authRouter);
app.use("/api/user",  userRouter);
app.use("/api/post",  postRouter);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log('Server is running');
});

export default app;
