import axios from "axios"
import logger from "../logger.helper"

if(!process.env.CUSTOMER_SERVICE_URI) throw new Error("process.env.CUSTOMER_SERVICE_URI is undefined")

const customerAxios = axios.create({
    baseURL : process.env.CUSTOMER_SERVICE_URI ?? "http://localhost:3003/customer",
    timeout : process.env.REQUEST_TIMEOUT * 1000
})

customerAxios.interceptors.response.use(
    response => {
        return response.data.data
    },
    err => {
    
        const errJSON = err.toJSON()

        logger.log({
            level : "error",
            message : errJSON.stack ?? errJSON.message
        })

        return Promise.reject(err)
    }
)

export default customerAxios