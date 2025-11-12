const express = require("express");
const router = express.Router()


const {update} = require("../controllers/users");
const {updateObj} = require("../validators/users");
const { protect, verified } = require("../middlewares/admin");
const authcheck = require("../middlewares/auth");


router.put("/update-profile",  authcheck, protect, verified, update, update);