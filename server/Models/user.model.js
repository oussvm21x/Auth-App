import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
    },

    username: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true

    },

    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
},
    { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;