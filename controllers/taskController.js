const { time } = require('node:console')
const { sequelize } = require('../config/db')
const Task = require("../models/taskModel")
const { title } = require('node:process')

async function createTask(req, res) {
    console.log(req.body)
    const { title, description, startDate, endDate } = req.body
    try {
        console.log('******')
        if (!title || !description || !startDate || !endDate) {

            return res.status(400).send({ msg: "All field are required", success: false })
        }
        if (new Date(endDate) <= new Date(startDate)) {
            return res.status(400).send({ msg: "End date should be gretaer than start date.", success: false })
        }
        const newTask = await Task.create({ title, description, startDate, endDate })
        console.log(newTask)
        res.status(200).send({ msg: "Task created successfully", success: true })
    }
    catch (error) {
        res.status(500).send({ msg: "server error", success: false })
    }
}

async function getAllTask(req, res) {
    try {
        const result = await Task.findAll()
        res.status(200).send({ task: result, success: true })
    }
    catch (error) {
        res.status(500).send({ msg: "server error", success: false })
    }
}

async function getTask(req, res) {
    const {ID} = req.params
    console.log('%%%%%%%%%',ID)
    try {
        const result = await Task.findByPk(ID)
        console.log(result)
        res.status(200).send({ task: result, success: true })
    }
    catch (error) {
        res.status(500).send({ msg: "server error", success: false })
    }
}

async function updateStatus(req, res) {
    const id = req.params.ID
    const status = req.body.status
    console.log('status',status)
    try {
        statusArr = ["Pending", "Inprogress", "Completed"]
        if (!statusArr.includes(status)) {
            return res.status(400).send({ msg: "Data not found", success: false })
        }
        const result = await Task.update(
            {
                status: status,
            },
            {
                where: { id:id }
            }
        )

        if (result === 0) {
            return res.status(404).json({
                message: 'ID not found'
            });
        }

        res.status(200).send({ msg: "task update successfully", success: true })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ msg: "server error", success: false })
    }
}
async function updateTask(req, res) {
    const id = req.params.ID
    try {
        const taskForUpdate = await Task.findOne({ where: { id:id } });  //Task.findByPk(id)
        if (!taskForUpdate) {
            return res.status(404).json({ message: 'task not found', success: false });
        }
     console.log(req.body.title,'update task data......',taskForUpdate)
        await taskForUpdate.update({
            title: req.body.title || taskForUpdate.title,
            description: req.body.description || taskForUpdate.description,
            startDate: req.body.startDate || taskForUpdate.startDate,
            endDate: req.body.endDate || taskForUpdate.endDate,
            status: req.body.status || taskForUpdate.status
        })
        //add code for validation startdate and end date


        // const result = await Task.update(
        //     {
        //         title:req.body.title,
        //         description: req.body.description,
        //         startDate:req.body.startDate,
        //         endDate:req.body.endDate
        //     },
        //     {
        //         where: { id }
        //     }
        // )

        // if (result === 0) {
        //     return res.status(404).json({ message: 'ID not found', success: false });
        // }

        res.status(200).send({ msg: "task update successfully",  success: true })
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send({ msg: "server error", success: false })
    }
}
async function deleteTask(req, res) {
    const id = req.params.ID;
    console.log(id)
    try {
        const deletedRows = await Task.destroy({
            where: { id }
        });

        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Task id not found', success: false });
        }

        res.status(200).json({ message: 'task deleted successfully', success: true });

    }
    catch (error) {
        res.status(500).send({ msg: "server error", success: false })
    }
}

async function getTotalTasks(req, res) {
    try {
        const result = await Task.count()
        res.status(200).send({ task: result, success: true })
    }
    catch (error) {
        res.status(500).send({ msg: "server error", success: false })
    }
}

async function getTotalCompletedTasks(req, res) {
    try {
        const result = await Task.count({
            where: { status: 'Completed' }
        })
        res.status(200).send({ completed_task: result, success: true })
    }
    catch (error) {
        res.status(500).send({ msg: "server error", success: false })
    }
}

async function getTotalPendingTasks(req, res) {
    try {
        const result = await Task.count({
            where: { status: 'Pending' }
        })
        res.status(200).send({ pending_task: result, success: true })
    }
    catch (error) {
        res.status(500).send({ msg: "server error", success: false })
    }
}

async function getTotalInProgressTasks(req, res) {
    try {
        const result = await Task.count({
            where: { status: 'Inprogress' }
        })
        res.status(200).send({ task: result, success: true })
    }
    catch (error) {
        res.status(500).send({ msg: "server error", success: false })
    }
}

module.exports = {
    createTask, getAllTask, getTask,
    updateStatus, updateTask, deleteTask, getTotalTasks,
    getTotalCompletedTasks, getTotalPendingTasks, getTotalInProgressTasks
}