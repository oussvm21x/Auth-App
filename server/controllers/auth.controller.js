import User from "../Models/user.model.js";
import { hashingPassword } from "../Middleware/user.middlewares.js";
export const signup = (req, res) => {
    const hashPass = hashingPassword(req.body.password);
    console.log(hashPass);
    const { name, username, email, password } = req.body;
    try {
        const user = new User({
            name,
            username,
            email,
            password
        });

        user.save();
        res.status(201).json({ message: "User created successfully" });


    } catch (error) {
        console.log(error);
    }

};