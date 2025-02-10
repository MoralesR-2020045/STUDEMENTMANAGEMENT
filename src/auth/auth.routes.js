import { register, login } from "./auth.controller.js";
import { validatorRegister, validatorLogin} from "../middleware/user-validators.js";
import { Router } from "express";

const router = Router()

router.post( "/register", validatorRegister, register )
router.post( "/login", validatorLogin, login )

export default router