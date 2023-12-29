// bootstrapper for mongodb

import mongoose, { ConnectOptions } from "mongoose";
import logger from "../../logger.helper";

function main(){

    let host = process.env.MONGODB_HOST
    const protocol = process.env.MONGODB_PROTOCOL

    if(process.env.MONGODB_PORT) host += `:${process.env.MONGODB_PORT}`

    const url = `${protocol}://${host}`

    const options : ConnectOptions = {
        dbName : process.env.MONGODB_DATABASE,
    }

    if(process.env.MONGODB_USERNAME){
        options.auth = {
            username : process.env.MONGODB_USERNAME,
            password : process.env.MONGODB_PASSWORD
        }
    }

    if(![1, 2].includes(mongoose.connection.readyState)){
        mongoose.connect(
            url,
            options
        )
        .then(
            success => {
                logger.info(`Successfully connected to mongodb server at ${url}`)
            }
        )
        .catch(
            err => {
                logger.error(`Unable to connected to db server at ${url}`)
                logger.error(err.message)
            }
        )
    }

}

if(
    process.env.MONGODB_HOST &&
    process.env.MONGODB_PROTOCOL
) main()