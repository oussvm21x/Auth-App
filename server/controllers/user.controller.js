import User from '../Models/user.model.js';
export const testUser = (req, res, next) => {
    res.send('API is running...');
    next();
}

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return res.status(401).json({ message: "Hello Unauthorized" });
    }
    try {
        if (req.body.password) {
            req.body.password = await hashPassword(req.body.password);
        }
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    picture: req.body.picture,
                    name: req.body.name,
                }
            },
            { new: true }
        );
        const { password, ...info } = updateUser._doc;
        res.status(200).json(info);

    } catch (error) {
        return res.status(401).json({ error: error.message });

    }

}


export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return res.status(401).json({ message: "Hello Unauthorized" });
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User has been deleted..." });
    }
    catch (error) {
        return res.status(401).json({ error: error.message });
    }
}
