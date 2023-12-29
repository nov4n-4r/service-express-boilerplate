import axios from "axios";
import logger from "../logger.helper";

if(!process.env.USER_SERVICE_URI) throw new Error("process.env.USER_SERVICE_URI is undefined")

const userAxios = axios.create({
    baseURL : process.env.USER_SERVICE_URI,
    timeout : process.env.REQUEST_TIMEOUT * 1000
})

userAxios.interceptors.response.use(
    response => response.data.data,
    err => {

        const errJSON = err.toJSON()

        logger.log({
            level : "error",
            message : errJSON.stack ?? errJSON.message
        })

        return Promise.reject(err)
    }
)

export default userAxios