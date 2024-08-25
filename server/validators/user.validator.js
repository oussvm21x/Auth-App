
const schema = {
    username: {
        isEmpty: {
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
    email: {
        isEmpty: {
            errorMessage: 'Email is required',
        },
        isEmail: {
            errorMessage: 'Email is invalid',
        },
    },
    password: {
        isEmpty: {
            errorMessage: 'Password is required',
        },
        isLength: {
            options: { min: 6 },
            errorMessage: 'Password should be at least 6 characters',
        },
    },
}

export default schema;