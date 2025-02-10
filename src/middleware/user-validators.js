import { body, param } from "express-validator";
import { bodyValidator } from "./document-validator.js";
import { emailExists, courseExist, studentExist, listCourse} from "../helpers/db-validator.js";

export const validatorRegister = [
    body("name").notEmpty().withMessage("El nombre es obligatorio"),
    body("surname").notEmpty().withMessage("El apellido es obligatorio"),
    body("email").notEmpty().withMessage("El email es obligatorio"),
    body("email").isEmail().withMessage("No es email valido"),
    body("email").custom(emailExists),
    body("password").notEmpty().withMessage("El password es obligatorio"),
    body("password").isStrongPassword({
        minLength: 8,
        minLowerCase: 1,
        minUppercase: 1, 
        minNumbers:1,
        minSymbols:1
    }).withMessage("El password debe contener al menos 8 caracteres"),
    bodyValidator
]

export const validatorLogin =[
    body("email").isEmail().withMessage("No es email válido"),
    body("email").notEmpty().withMessage("El email es obligatorio"),
    body("password").notEmpty().withMessage("El password es obligatorio"),
    body("password").isStrongPassword({
        minLength: 8,
        minLowerCase: 1,
        minUppercase: 1, 
        minNumbers:1,
        minSymbols:1
    }).withMessage("El password debe contener al menos 8 caracteres"),
    bodyValidator
]


export const validatorAssignCourse = [
    body("studentId").notEmpty().withMessage("El id del studiante es obligatorio"), 
    body("studentId").custom(studentExist),
    body("studentId").custom(listCourse),
    body("courseId").notEmpty().withMessage("El id del curso es obligatorio"),
    body("courseId").custom(courseExist),
    bodyValidator
]

export const userStudenValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido"),
    param("uid").custom(studentExist),
    bodyValidator
]


export const updateStudentValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(studentExist),
    body("email").isEmail().withMessage("No es email válido"),
    body("email").custom(emailExists),
    bodyValidator
]

export const deleteUserValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(studentExist),
    bodyValidator
]