const User = require('../models/userModel')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const otpStore = require("../utils/otpStore");


const register = async (req, res) => {
    console.log(req.body, "=========")
    let { name, email, password, contactNumber } = req.body
    try {
        if (!req.file) {
            return res.status(400).send({ success: false, msg: "Please upload file" })
        }
        const existingUser = await User.findOne({ where: { email: email } })
        if (existingUser) {
            return res.status(401).send({ msg: "User already exist", success: false })
        }

        const salt = await bcryptjs.genSaltSync(8)
        console.log(salt, "Salt")
        password = await bcryptjs.hashSync(password, salt)
        console.log(password, "Haspassword")

        let imgPath = `/uploads/users/${req.file.filename}`;

        const newUser = await User.create({ name, email, password, contactNumber, imgPath })
        res.status(201).send({ msg: "sucessfully registered", sucess: true })
    }
    catch (error) {
        res.status(500).send({ msg: "server error", success: false })
    }
}

//let existingUser
const login = async (req, res) => {
    const { email, password } = req.body
    // console.log(req.body)
    try {
        const existingUser = await User.findOne({ where: { email: email } })
        if (!existingUser) {
            return res.status(401).send({ msg: "User does not exist", success: false })
        }

        isPassCorrect = await bcryptjs.compare(password, existingUser.password)

        if (!isPassCorrect) {
            return res.status(401).send({ msg: "Invalid Credential", success: false })
        }

        const id = existingUser.id
        const role = existingUser.role
        const token = jwt.sign({ id: id, role: role }, process.env.SECRET_KEY, { expiresIn: "2h" })
        console.log('token', token)
        res.status(200).send({ msg: "Logged in sucessfully", sucess: true, token: token })
    }
    catch (error) {
        res.status(500).send({ msg: "server error", success: false })
    }
}

const getUserInfo = async (req, res) => {
    try {
        // console.log('****',req.user)
        const loggedUser = await User.findByPk(req.user.id,
            {
                attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
            })
        // console.log('**************', loggedUser.imgPath)
        if (loggedUser.imgPath != null) {
            imgPath = process.env.BASE_URL + loggedUser.imgPath;
            userData = { ...loggedUser, imgPath, }
        }


        //console.log(loggedUser, "----------------after img path change------------")

        res.status(201).send({ looggedUser: loggedUser, success: true })

    } catch (error) {
        res.status(500).send({ msg: "server error", success: false })
    }
}

const getAllUser = async (req, res) => {
    try {
        const allUser = await User.findAll()
        res.status(200).send({ allUser: allUser, success: true })

    } catch (error) {

        res.status(500).send({ msg: 'server error', success: false })
    }
}

const getTotalNumOfUser = async (req, res) => {
    try {
        const UserCount = await User.count()
        res.status(200).send({ UserCount: UserCount, success: true })

    } catch (error) {

        res.status(500).send({ msg: 'server error', success: false })
    }
}

async function changePassword(req, res) {
    try {
        console.log("------------------")
        const id = req.params.ID
        console.log(id)
        let { pass } = req.body
        console.log(id, pass)
        // Get token from headers
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) return res.status(401).json({ success: false, msg: 'No token provided' });

        // Verify JWT
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const salt = await bcryptjs.genSaltSync(8)
        pass = await bcryptjs.hashSync(pass, salt)

        const result = await User.update(
            {
                password: pass,
            },
            {
                where: { id: id }
            }
        )

        if (result === 0) {
            return res.status(404).json({
                message: 'ID not found'
            });
        }

        res.status(200).send({ msg: "Password update successfully", success: true })
    }
    catch (error) {
        console.error('Error changing password:', error.message);
        res.status(500).send({ msg: "server error", success: false })
    }
}


const changePasswordOTP = async (req, res) => {

    const { email, password } = req.body;

    const hash = await bcrypt.hash(password, 8);

    await User.update(
        { password: hash },
        {
            where: { email }
        }
    );

    otpStore.delete(email);

    res.json({
        success: true,
        message: "Password changed successfully"
    });

};

module.exports = {
    register, login, getUserInfo, getAllUser, getTotalNumOfUser, changePassword,
    changePasswordOTP
}