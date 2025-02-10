'use strict'

import mongoose, {Schema, model} from "mongoose"

const userSchema = Schema({
    name:{
        type: String, 
        required: [true, "Name is required"],
        minLength: [3, "Name needs more than 3 characters"],
        maxLength: [30, "Name cannot exced 30 characters"]
    },
    surname:{
        type: String, 
        required: [true, "surname is required"],
        minLength: [3, "Name needs more than 3 characters"],
        maxLength: [30, "Name cannot exced 30 characters"]
    },
    phone:{
        type: String, 
        minLength: 8,
        maxLength: 8,
    },
    role:{
        type: String, 
        enum:["TEACHER_ROLE", "STUDENT_ROLE"],
        default: "STUDENT_ROLE"
    },
    
    course: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
    
    ,
    email:{
        type: String, 
        required: [true, "Email is required"],
        maxLength: [60, "Name cannot exced 30 characters"]
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    status:{
        type: Boolean,
        default: true
    }
})

userSchema.methods.toJSON = function(){
    const {password, _id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}

export default model ("User", userSchema)