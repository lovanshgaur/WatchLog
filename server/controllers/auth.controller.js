import User from '../models/User.model.js';

export const signup = async (req, res) => {
    try {
        res.send('signup')
    } catch (error) {
        console.log(error)
    }
}
export const signin = async (req, res) => {
    try {
        res.send('signin')
    } catch (error) {
        console.log(error)
    }
}
