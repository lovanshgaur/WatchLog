import User from '../models/User.model.js';
import bcrypt from 'bcrypt';

export const changeAvatar = async (req, res) => {
    try {
        const { avatar } = req.body;

        if (!avatar) {
            return res.status(400).json({ message: "Avatar must be chosen." })
        }
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { avatar },
            { new: true }
        ).select("Username Avatar");

        res.json({
            message: "Avatar Updated",
            user
        })

    } catch (error) {
        console.log(`Change avatar error : ${error}`)
        res.status(500).json({ message: `Change avatar error : ${error}` })
    }
    res.json({ message: 'Change Avatar' });
}


export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            res.status(401).json({ message: `All fields are mandatory.` })
        }

        if (oldPassword === newPassword) {
            res.status(401).json({ message: `Old Password can't be same as New Password` })
        }

        const user = await User.findById(req.user.id).select("+password");
        console.log(user)
        if (!user) {
            res.status(401).json({ message: `User not found!` })
        }

        const isMatched = await bcrypt.compare(oldPassword, user.password);
        if (!isMatched) {
            return res.status(400).json({
                message: "Old Password is incorrect."
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword;
        await user.save()

        return res.json({
            message: "Password updated successfully."
        })


    } catch (error) {
        console.log(`Change Password error : ${error}`)
        res.status(500).json({ message: `Change password error : ${error}` })
    }
}
