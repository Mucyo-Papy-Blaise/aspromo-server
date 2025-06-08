import mongoose from "mongoose";
import env from './env'

const connectdb = async()=>{
    try {
        await mongoose.connect(env.mongo_db_uri)
        console.log('db is connected successfully!')
    } catch (error: any) {
        console.log('failed to connect db', error.message)
    }
}

export default connectdb