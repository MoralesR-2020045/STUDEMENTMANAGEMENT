import { assignCourse, listCourseAssign, updateStudent, deleteStudent} from "./user.controller.js";
import { validatorAssignCourse, userStudenValidator, updateStudentValidator, deleteUserValidator} from "../middleware/user-validators.js";
import { Router } from "express";

const router = Router()

router.post( "/assignCourseStudent", validatorAssignCourse, assignCourse )
router.get( "/listCourseStudent/:uid", userStudenValidator, listCourseAssign )
router.put( "/updateStudent/:uid", updateStudentValidator, updateStudent )
router.get( "/deleteStudent/:uid", deleteUserValidator, deleteStudent )


export default router