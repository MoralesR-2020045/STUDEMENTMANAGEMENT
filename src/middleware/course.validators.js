import { body, param } from "express-validator"
import { accessCourse, nameExistsCourse,  courseExist, studentExist} from "../helpers/db-validator.js"
import { bodyValidator } from "./document-validator.js";

export const createCourseValidatort = [
    body("nameCourse").notEmpty().withMessage("El nombre es obligatorio"),
    body("nameCourse").custom(nameExistsCourse),
    body("descripcion").notEmpty().withMessage("La descripcion es obligatoria"),
    body("teacherId").notEmpty().withMessage("Es obligatorio el id del teacher"),
    body("teacherId").custom(accessCourse),
    bodyValidator
]

export const updateCourseValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(courseExist),
    body("teacherId").custom(accessCourse),
    body("nameCourse").custom(nameExistsCourse),
    bodyValidator
]

export const userTeacherValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido"),
    param("uid").custom(accessCourse),
    bodyValidator
]

export const deletTeacherValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido"),
    param("uid").custom(courseExist),
    body("teacherId").isMongoId().withMessage("No es un ID válido"),
    body("teacherId").custom(accessCourse),
    bodyValidator
]