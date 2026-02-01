import User from '../models/User.model.js';

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


export const changePassword = async (req,res) => {
    res.send('Change Password')
}