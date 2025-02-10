'use strict'
import morgan from "morgan"
import cors from "cors"
import helmet from "helmet"
import express from "express"
import { dbConnection } from "./mongo.js"
import authRoutes from "../src/auth/auth.routes.js"
import courseRoutes from "../src/course/course.routes.js"
import userRoutes from "../src/user/user.routes.js"

const settings = (app) =>{
    app.use(morgan("dev"))
    app.use(helmet())
    app.use(cors())
    app.use(express.json()); 
}

const conectionDB = async () =>{
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

const routes = (app) =>{
    app.use("/studentManagement/v1/auth", authRoutes)
    app.use("/studentManagement/v1/course", courseRoutes)
    app.use("/studentManagement/v1/user", userRoutes)
}


export const initialServer = () =>  {
    const app = express()
    try{
        settings(app)
        conectionDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`El servidor esta iniciado ${process.env.PORT}`)
    }catch(err){
        console.log('El servidor no se ha podido iniciar ')
    }

}