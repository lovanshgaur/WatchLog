import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 30
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "avatar1.jpg"
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema);
export default User;