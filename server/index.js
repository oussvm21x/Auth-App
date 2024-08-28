import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';
import bodyParser from 'body-parser'
dotenv.config();

const app = express();
app.use(express.json());

connectDB();


app.use("/api/user", userRoute)
app.use("/api/auth", authRoute)



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
