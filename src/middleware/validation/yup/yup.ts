import { NextFunction } from "express"
import * as yup from "yup"

export default async function yupValidate(
    target : Object,
    schema : yup.Schema,
    next : NextFunction
) {
    try{
        await schema.validate(target)
        return next()
    }catch(err){
        return next(err)
    }
}