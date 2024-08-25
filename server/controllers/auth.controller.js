import User from "../Models/user.model.js";
import { hashPassword } from "../Middleware/user.middlewares.js";
import { errorMiddleware } from "../Middleware/error.middleware.js"
export const signup = async (req, res, next) => {
    const hashPass = hashPassword(req.body.password);
    const { name, username, email, password } = req.body;
    try {
        const user = new User({
            name,
            username,
            email,
            password: hashPass
        });

        const savedUser = await user.save();
        console.log(savedUser);
        res.status(201).json({ message: "User created successfully" });


    } catch (error) {
        next(error)
    }

};