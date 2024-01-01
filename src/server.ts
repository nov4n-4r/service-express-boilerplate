import {config} from "dotenv"
import path from "path"

config({
    path : path.join(
        process.cwd(),
        ".env"
    ),
    debug : true
})

if(process.env.NODE_ENV){
    config({
        path : path.join(
            process.cwd(),
            `.env.${process.env.NODE_ENV}`
        ),
        debug : process.env.NODE_ENV !== "development"
    })
}

import express from "express"
import indexRouter from "./route/index.route"
import logger from "./helper/logger.helper"
import "./helper/database/mongo/index.mongodb"

const app = express()

app.use("/", indexRouter)

app.listen(
    process.env.PORT,
    () => {
        logger.verbose(`App is running on port : ${process.env.PORT}`)
    }
)