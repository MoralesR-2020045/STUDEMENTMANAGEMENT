'use strict'
import { mongoose } from "mongoose"

export const dbConnection = async () => {
    try {
        mongoose.connection.on("error", () => {
            console.log("MongoDB | could not be connect to MongoDB")
            mongoose.disconnect()
        })
        mongoose.connection.on("connecting", () => {
            console.log("MongoDB  | try connecting")
        })
        mongoose.connection.on("connected", () => {
            console.log("MongoDB | Connected to MongoDB")
        })
        mongoose.connection.on("open", () => {
            console.log("MongoDB | Connected to DataBase")
        })
        mongoose.connection.on("reconnected", () => {
            console.log("MongoDB | Reconected to MongoDB")
        })
        mongoose.connection.on("disconnected", () => {
            console.log("MongoDB | disconnected to MongoDB")
        })
        await mongoose.connect(process.env.URI_DB, {
            serverSelectionTimeoutMS: 4000,
            maxPoolSize: 50
        })
    } catch (err) {
        console.log(`Database failed ${err}`)
    }
}