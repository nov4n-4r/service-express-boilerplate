// bootstrapper for mongodb

import mongoose, { ConnectOptions } from "mongoose";

let host = process.env.MONGODB_HOST
const protocol = process.env.MONGODB_PROTOCOL || "mongodb"

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
            console.log(`Successfully connected to mongodb server at ${url}`)
        }
    )
    .catch(
        err => {
            console.log(`Unable to connected to db server at ${url}`)
            console.log(err)
        }
    )
}
