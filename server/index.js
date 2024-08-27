import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';
dotenv.config();

const app = express();
app.use(express.json());
// app.use(cors({
//     origin: 'http://localhost:5173',
//     methods: 'GET,POST,PUT,DELETE',
//     credentials: true
// }));

connectDB();


app.use("/api/user", userRoute)
app.use("/api/auth", authRoute)



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
