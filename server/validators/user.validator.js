
const userValidator = {
    username: {
        notEmpty: {
            errorMessage: 'Username is required',
        },
        isLength: {
            options: { min: 2, max: 25 },
            errorMessage: 'Username should be at least 4 characters',
        },
        isString: {
            errorMessage: 'Username should be a string',
        },
    },
    name: {
        notEmpty: {
            errorMessage: 'Name is required',
        },
        isLength: {
            options: { min: 2, max: 25 },
            errorMessage: 'Name should be at least 2 characters',
        },
        isString: {
            errorMessage: 'Name should be a string',
        },
    },
    email: {
        notEmpty: {
            errorMessage: 'Email is required',
        },
        isEmail: {
            errorMessage: 'Email is invalid',
        },
    },
    password: {
        notEmpty: {
            errorMessage: 'Password is required',
        },
        isLength: {
            options: { min: 6 },
            errorMessage: 'Password should be at least 6 characters',
        },
    },
}

export default userValidator;