import express from "express"
import {config} from "dotenv"
import path from "path"
import indexRouter from "./route/index.route"

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

const app = express()

app.use("/", indexRouter)

app.listen(
    process.env.PORT,
    () => {
        console.log(`App is running on port : ${process.env.PORT}`)
    }
)