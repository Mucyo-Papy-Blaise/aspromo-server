import dotenv from 'dotenv'
dotenv.config()

const env = {
    mongo_db_uri: process.env.MONGO_DB_URI!,
    port: process.env.PORT!,
    mail_user: process.env.MAIL_USER!,
    mail_pass: process.env.MAIL_PASS!
}
export default env