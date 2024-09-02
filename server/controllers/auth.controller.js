import User from "../Models/user.model.js";
import { comparePassword, hashPassword } from "../Middleware/user.middlewares.js";
import { errorMiddleware } from "../Middleware/error.middleware.js"
import jsonwebtoken from 'jsonwebtoken'
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
        res.status(201).send(savedUser);


    } catch (error) {
        next(error)
    }

};


export const signin = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const findUser = await User.findOne({ email })
        if (!findUser) return res.status(404).send({ message: " no user found", success: false })
        const validatePassword = comparePassword(password, findUser.password)
        const { password: hashed, ...validUser } = findUser._doc
        if (!validatePassword) return res.status(401).send({ message: "bad authentication , wrong password", success: false })
        const token = jsonwebtoken.sign({ id: findUser._id }, process.env.JWT_SECRETE)
        res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }).status(200).send(validUser)
    } catch (error) {

    }


}

export const google = async (req, res, next) => {
    const { name, email, picture } = req.body
    try {
        const findUser = await User.findOne({ email })
        if (findUser) {
            console.log("user found")
            const token = jsonwebtoken.sign({ id: findUser._id }, process.env.JWT_SECRETE)
            res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }).status(200).send(findUser)

        }
        else {
            const user = new User({
                name: name,
                email: email,
                picture: picture,
                username: email.split('@')[0] + Math.floor(Math.random() * 1000000).toString(),
                password: hashPassword(Math.random().toString(36).slice(-8))

            });
            const savedUser = await user.save();
            const token = jsonwebtoken.sign({ id: savedUser._id }, process.env.JWT_SECRETE)
            res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }).status(200).send(savedUser)
        }



    }
    catch (error) {
        console.log(error);
    }
}


export const github = async (req, res, next) => {
    console.log("github")
    const { name, email, picture } = req.body
    try {
        const findUser = await User.findOne({ email })
        if (findUser) {
            console.log("user found")
            const token = jsonwebtoken.sign({ id: findUser._id }, process.env.JWT_SECRETE)
            res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }).status(200).send(findUser)

        }
        else {
            const user = new User({
                name: name,
                email: email,
                picture: picture,
                username: email.split('@')[0] + Math.floor(Math.random() * 1000000).toString(),
                password: hashPassword(Math.random().toString(36).slice(-8))

            });
            const savedUser = await user.save();
            const token = jsonwebtoken.sign({ id: savedUser._id }, process.env.JWT_SECRETE)
            res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }).status(200).send(savedUser)
        }



    }
    catch (error) {
        console.log(error);
    }
}