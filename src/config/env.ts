import dotenv from 'dotenv'
dotenv.config()

const env = {
    mongo_db_uri: process.env.MONGO_DB_URI!,
    port: process.env.PORT!
}
export default env