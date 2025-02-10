import { createCourse, updateCourse, listCourseTeacher, deleteCourse} from "./course.controller.js";
import { createCourseValidatort, updateCourseValidator, userTeacherValidator, deletTeacherValidator} from "../middleware/course.validators.js";
import { Router } from "express";

const router = Router()

router.post( "/createCourse", createCourseValidatort,  createCourse)
router.put( "/updateCourse/:uid",  updateCourseValidator, updateCourse)
router.get( "/listCourseTeacher/:uid", userTeacherValidator, listCourseTeacher)
router.get( "/deleteCourse/:uid", deletTeacherValidator, deleteCourse )

export default router