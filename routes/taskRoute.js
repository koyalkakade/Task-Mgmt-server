const express=require('express')
const {createTask,getAllTask,getTask,
    updateStatus,updateTask,deleteTask,
    getTotalTasks,getTotalCompletedTasks,getTotalPendingTasks,getTotalInProgressTasks
}=require('../controllers/taskController')
const router=express.Router()
const {auth,admin}=require('../middleware/auth')

router.post('/createTask',auth,admin, createTask)
router.get('/getAllTask',auth,getAllTask)
router.get('/getTask/:ID',auth,getTask)
router.patch('/updateStatus/:ID',auth,updateStatus)
router.put('/updateTask/:ID',auth,admin,updateTask)
router.delete('/delete/:ID',auth,admin,deleteTask)

router.get('/getTotalTasks',getTotalTasks)
router.get('/getTotalCompletedTasks',getTotalCompletedTasks)
router.get('/getTotalPendingTasks',getTotalPendingTasks)
router.get('/getTotalInProgressTasks',getTotalInProgressTasks)

// gettaskbystatus //?status=""
// gettaskbyselectedMonth
module.exports=router