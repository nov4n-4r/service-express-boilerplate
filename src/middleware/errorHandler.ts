import { NextFunction, Request, Response } from "express";
import { ValidationError } from "yup";
import logger from "../helper/logger.helper";

function errorHandler(
    err : any,
    req : Request, 
    res : Response, 
    next : NextFunction
){

    if(err instanceof ValidationError){
        return res
            .writeHead(400)
            .end(err.message ?? "Bad Request")
    }

    if(err.statusCode){
        return res
            .writeHead(err.statusCode)
            .end(err.message)
    }

    logger.error(err.stack)

    return res
        .writeHead(500)
        .end(err.message ?? "Internal server error")

}

export default errorHandler