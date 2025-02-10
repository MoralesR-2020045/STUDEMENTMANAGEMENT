'use strict'

import mongoose, {Schema, model} from "mongoose"

const courseSchema = Schema({
    nameCourse:{
        type: String, 
        unique: true,
        required: [true, "Name is required"],
        minLength: [3, "Name needs more than 3 characters"],
        maxLength: [30, "Name cannot exced 40 characters"]
    },
    descripcion:{
        type: String, 
        required: [true, "Name is required"],
        minLength: [3, "Name needs more than 3 characters"],
        maxLength: [800, "Name cannot exced 800 characters"]
    },
    teacherId:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
    listStudentId:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
    status:{
        type: Boolean,
        default: true
    }
})

export default model ("Course", courseSchema)