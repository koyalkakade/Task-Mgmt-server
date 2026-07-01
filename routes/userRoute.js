const express = require("express");
const {
  register,
  login,
  getUserInfo,
  getAllUser,getTotalNumOfUser,changePassword
//   updateProfile,
} = require("../controllers/userController");
const{auth}=require('../middleware/auth')
const router = express.Router();
const uploadImage=require('../middleware/multer')

router.post("/register",uploadImage.single('imgPath'), register);
router.post("/login", login);
router.get("/getUserInfo",auth, getUserInfo);
router.get("/getAllUser",auth, getAllUser);
router.get("/getTotalNumOfUser",auth, getTotalNumOfUser);
router.patch('/changePassword/:ID',auth,changePassword)


// router.put("/updateProfile", updateProfile);

module.exports = router;