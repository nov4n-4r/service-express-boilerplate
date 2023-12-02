import { test } from "../controller/index.controller"
import express from "express"

const indexRouter = express.Router()

indexRouter.get("/", test)

export default indexRouter