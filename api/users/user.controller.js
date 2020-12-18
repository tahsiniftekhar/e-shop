const { 
    createUser, 
    getUserById,
    getUserByUsername,
    getUsers, 
    updateUser, 
    deleteUser 
} = require("./user.service")
const { genSaltSync, hashSync, compareSync } = require("bcrypt")
const { sign } = require("jsonwebtoken")


module.exports = {
    createUser: (req, res) => {
        const body = req.body
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt)
        createUser(body, (err, results) => {
            if(err){
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },


    login: (req, res) => {
        const body = req.body
        getUserByUsername(body.username, (err, results) => {
            if (err) {
                console.log(err)
            }
            if (!results) {
                return res.status(400).json({
                    success: 0,
                    data: "Invalid credential"
                })
            }

            const secret_key = process.env.SECRET_KEY
            const result = compareSync(body.password, results.password)
            if(result) {
                // req.session.loggedin = true
                // req.session.username = body.username
                results.password = undefined
                const jsontoken = sign({ result: results }, secret_key, { expiresIn: "3h"})
                return res.json({
                    success: 1,
                    message: "login successfully",
                    token: jsontoken
                })
            }else{
                return res.status(400).json({
                    success: 0,
                    data: "Invalid credential"
                })
            }
        })
    },


    getUserById: (req, res) => {
        const id = req.params.id
        getUserById( id, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            if (!results) {
                return res.status(400).json({
                    success: 0,
                    message: "Record not found"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },

    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },

    updateUser: (req, res) => {
        const body = req.body
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt)

        updateUser(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                }) 
            }
            if (!results) {
                return res.status(400).json({
                    success: 0,
                    message: "Failed to update user"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Updated successfully"
            })
        })
    },

    deleteUser: (req, res) => {
        const id = req.params.id
        deleteUser(id, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            if (!results.affectedRows) {
                return res.status(400).json({
                    success: 0,
                    message: "Record not found"
                })
            }
            return res.status(200).json({
                success: 1,
                message: "user deleted successfully"
            })
        })
    },

}