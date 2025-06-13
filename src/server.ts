import express from 'express'
import env from './config/env'
import connectdb from './config/dbconnect'
import cors from 'cors'
import categoryRes from './routers/category.router'
import eventRes from './routers/event.router'
import applicantRes from './routers/applicant.router'
import testimonialRes from './routers/testimonial.router'

const app = express()
app.use(express.json())

app.use(cors({
    origin: ['http://localhost:3000'],
    methods:["POST","GET","PUT","PATCH","DELETE","OPTIONS"]
}))

app.use('/category', categoryRes)
app.use('/event',eventRes )
app.use('/applicant', applicantRes)
app.use('/testimonial', testimonialRes)

const PORT = env.port
app.listen(PORT, async()=>{
    try {
        await connectdb()
        console.log(`Server is Running on Port ${PORT}`)
    } catch (error) {
       console.log('Error in server running', error) 
    }
})