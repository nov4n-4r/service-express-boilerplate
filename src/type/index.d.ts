declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production' | 'test'
            PORT: number
            PWD: string
            MONGODB_HOST: string
            MONGODB_PORT: number | string | undefined
            MONGODB_USERNAME: string | undefined
            MONGODB_PASSWORD: string | undefined
            MONGODB_PROTOCOL: string
            MONGODB_DATABASE: string
        }
    }
}
  
// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}