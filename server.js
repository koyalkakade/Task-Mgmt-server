const express =require('express')
require('dotenv').config()
//const cors =require('cors')
const path=require('path')
const {connectDB}=require('./config/db')
const taskRouter=require('./routes/taskRoute')
const userRouter=require('./routes/userRoute')
const assignTaskRouter=require('./routes/assignTaskRouter')

const app=express()

const port=process.env.PORT||5003
app.use(express.json());//middleware most important

// app.use(cors())
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true
// }));
// app.use(cors({
//     origin:`http:localhost:5173`    ////wrong got error
// }))

//app.get('/',(req,res)=>{
//    res.send("server is started")
//})

app.use('/task',taskRouter)
app.use('/user',userRouter)
app.use('/assign',assignTaskRouter)

app.use('/uploads',express.static('uploads'))

// 1. Serve static files from the React frontend build directory
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// 2. Handle any requests that don't match the API routes by sending back the React index.html file
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.listen(port,()=>{
    console.log(`server running on http:localhost:${port}`)
})