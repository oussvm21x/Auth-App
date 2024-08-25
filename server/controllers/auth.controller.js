export const signup = (req, res) => {

    const { name, username, email, password } = req.body;
    res.send('User created successfully');


};