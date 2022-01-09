import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import bcrypt from 'bcrypt'
import { createAccessToken, createRefreshToken } from '../../../utils/generateToken'

connectDB()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await login(req, res)
            break;
    }
}

const login = async (req, res) => {
    try{
        const { username, password } = req.body

        const user = await Users.findOne({username})
        if(!user) return res.status(400).json({err: 'This username does not exist.'})

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({err: 'Incorrect password.'})

        const access_token = createAccessToken({id: user._id})
        const refresh_token = createRefreshToken({id: user._id})

        res.json({
            msg: "Login Success!",
            refresh_token,
            access_token,
            user:{
                username: user.username,
                fname:user.fname,
                lname:user.lname,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                root: user.root
            }
        })
        
    }catch(err){
        return res.status(500).json({err: err.message})
    }
}