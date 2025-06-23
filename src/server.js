import express from 'express';
import dotenv from 'dotenv';

import { connectToDB } from './database/db.js';

import { router as authRouter } from './routes/auth_routes.js';
dotenv.config();
const PORT=process.env.PORT||3000;


const app = express()

app.use(express.json())

connectToDB();


//routing
app.use('/auth',authRouter);





app.listen(PORT,()=>{
    console.log(`server is started at port ${PORT}`);
}
)