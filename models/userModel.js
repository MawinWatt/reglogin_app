import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required : true
    },
    fname:{
        type: String,
        required : true
    },
    lname:{
        type: String,
        required : true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    root: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/cirrocumulus/image/upload/v1641496706/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55_uqnc7f.jpg'
    }

}, {
    timestamps:true
})

let Dataset = mongoose.models.user || mongoose.model('user', userSchema)
export default Dataset