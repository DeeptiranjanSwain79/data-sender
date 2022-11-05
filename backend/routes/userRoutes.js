const express = require('express');
const router = express.Router();
const {
    registerUser, updateProfile, getUsers, getUserDetails, deleteUser, mail
} = require("../controllers/userController")

router.route("/register").post(registerUser);

router.route("/users").get(getUsers);

router.route("/user/:id")
    .get(getUserDetails)
    .put(updateProfile)
    .delete(deleteUser);

router.route("/mail").post(mail);

module.exports = router;