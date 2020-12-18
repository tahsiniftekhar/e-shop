const router = require("express").Router()
const { checkToken } = require("../../auth/token_validation")
const { addUserValidation } = require("../../validation/user.validation")
const { 
    createUser,
    getUserById, 
    getUsers, 
    updateUser, 
    deleteUser, 
    login
} = require("./user.controller")


router.post("/", checkToken, addUserValidation, createUser)
router.post("/login", login)
router.get("/", checkToken, getUsers)
router.get("/:id", checkToken, getUserById)
router.patch("/", checkToken, updateUser)
router.delete("/:id", checkToken, deleteUser)

module.exports = router