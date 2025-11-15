import express from 'express';
import cors from "cors";
import  'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDb from './config/mongodb.js';
import authRouter from './routes/authRoute.js'
import userRouter from './routes/userRoute.js';

const app = express();
const port = process.env.PORT || 4000

app.use(express.json())
app.use(cookieParser())
app.use(cors({  origin: "http://localhost:5173", credentials: true}))

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.listen(port,async () => {
    console.log(`server running on port ${port}`)
    await connectDb()
})