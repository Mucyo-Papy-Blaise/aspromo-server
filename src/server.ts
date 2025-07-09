import express from 'express'
import env from './config/env'
import './cron/eventStatusUpdater';
import connectdb from './config/dbconnect'
import cors from 'cors'
import categoryRes from './routers/category.route'
import eventRes from './routers/event.route'
import applicantRes from './routers/applicant.route'
import testimonialRes from './routers/testimonial.route'
import adminRes from './routers/admin.route'
import notificationsRes from './routers/notifications.route'
import { startReminderCron } from './cron/reminder.Cron';

startReminderCron()

const app = express() 
app.use(express.json())

app.use(cors({
    origin: ['http://localhost:3000',"http://localhost:3001","https://aspromo-fn.onrender.com","https://aspromo-admin-pages.onrender.com"],
    methods:["POST","GET","PUT","PATCH","DELETE","OPTIONS"]
}))

app.use('/category', categoryRes)
app.use('/event',eventRes )
app.use('/applicant', applicantRes)
app.use('/testimonial', testimonialRes)
app.use('/admin', adminRes)
app.use('/notifications', notificationsRes)

const PORT = env.port
app.listen(PORT, async()=>{
    try {
        await connectdb()
        console.log(`Server is Running on Port ${PORT}`) 
    } catch (error) {
       console.log('Error in server running', error) 
    }
})