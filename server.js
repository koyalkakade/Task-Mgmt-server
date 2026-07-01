const express =require('express')
require('dotenv').config()
const cors =require('cors')
const path=require('path')
const {connectDB}=require('./config/db')
const taskRouter=require('./routes/taskRoute')
const userRouter=require('./routes/userRoute')
const assignTaskRouter=require('./routes/assignTaskRouter')

const app=express()

const port=process.env.PORT||5003
app.use(express.json());//middleware most important

 app.use(cors())
// app.use(cors({
//     origin:`http:localhost:5173`    ////wrong got error
// }))

app.get('/',(req,res)=>{
    res.send("server is started")
})

app.use('/task',taskRouter)
app.use('/user',userRouter)
app.use('/assign',assignTaskRouter)

app.use('/uploads',express.static('uploads'))

app.listen(port,()=>{
    console.log(`server running on http:localhost:${port}`)
})