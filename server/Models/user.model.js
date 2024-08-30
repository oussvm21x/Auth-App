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
    picture: {
        type: mongoose.Schema.Types.String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG_lrp2KdgpHFWjZarOfOncIDEBmALnfKf-w&s",
    },
},
    { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;