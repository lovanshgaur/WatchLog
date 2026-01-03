import User from "../models/User.js";

export const changeAvatar = async (req, res) => { 
    try {
        
        const {avatar} = req.body;

        if(!avatar){
            return res.status(400).json({message: "Avatar must be chosen."})
        }
        const user = await User.findByIdAndUpdate(
            req.user.id,
            {avatar},
            {new: true}
        ).select("username avatar");
        res.json({
            message: "Avatar Updated",
            user
        })

    } catch (error) {
        res.status(500).json({message: `Change Avatar Error : ${error}`})
        console.error(`Change Avatar Error : ${error}`)
    }
}