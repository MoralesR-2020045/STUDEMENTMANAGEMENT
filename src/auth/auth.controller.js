'use strict'

import {hash, verify} from "argon2"
import User from "../user/user.model.js"
import { generateJWT } from "../helpers/generate-jwt.js"
export const register = async (req, res) =>{
    try{
        const userInformation = req.body;
        const encryptedPassword = await hash(userInformation.password)
        userInformation.password = encryptedPassword

        const user = await User.create(userInformation);
        // Return un estatus de creación 
        return res.status(201).json({
            message: "You have been registered correctly",
            id: user.id,
            name: user.name,
            email: user.email,
            role: `Has sido registrado como ${user.role}`
        });
    }catch(err){
        //Return de un Error interno del servidor
        return res.status(500).json({
            message: "failed registration",
            error: err.message
        });
    }
}

export const login = async (req, res) =>{
    try{
        const {email, password}= req.body;
        const acces = await User.findOne({ email });

        if(!acces){
            return res.status(400).json({
                message: "Credencial invalidad",
                error: "No existe algun usuario con el correo ingresado"
            })
        }

        const validatorPassword = await verify(acces.password, password)

        if(!validatorPassword){
            return res.status(400).json({
                message: "Credencial invalidad",
                error: "La contraseña es incorrecta"
            })
        }

        const webToken =  await generateJWT(acces.id)
        return res.status(200).json({
            message: "login successful",
            userDetails: {
                role: `Te has logeado desde tu cuenta de ${acces.role}`,
                token: webToken
            }
        })
    }catch(err){
        return res.status(500).json({
            message: "login failed, server error", 
            error: err.message
            
        })
    }
}
