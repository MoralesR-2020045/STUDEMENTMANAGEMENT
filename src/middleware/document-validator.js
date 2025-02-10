import { validationResult } from "express-validator";

export const bodyValidator = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        /* Agregre un archivo JSON ya solo return next me daba un obcject
        pienso que es mejor manenar el arreglo dentro de un JSON */
        return res.status(400).json({
            message: "Hemos encontrado errores al validar",
            errors: errors.array()
        });
    }
    next()
}