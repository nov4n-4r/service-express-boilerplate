import { NextFunction, Request, Response } from "express";

export function test(req : Request, res : Response, next : NextFunction){
    return res.end("Hello world") 
}