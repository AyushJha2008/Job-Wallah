import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phoneNumber:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ['student', 'recruiter'],
        required: true
    },
    profile:{ //user will add profile later, NO required=true
        bio:{type: String}, 
        skills: [{type: String}], //we used array bcoz multiple skills
        resume: {type: String}, //url form
        resumeName: {type: String},
        company: {type:mongoose.Schema.Types.ObjectId, ref:'Company'},
        profilePhoto:{
            type: String,
            default:""
        }
    }
}, {timestamps:true})

export const User = mongoose.model('User', userSchema)