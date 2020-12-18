require("dotenv").config()
const express = require("express")
const session = require("express-session")
const app = express()
const userRouter = require("./api/users/user.router")

app.use(express.json())
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true
}))

app.use("/api/users", userRouter)

const port = process.env.APP_PORT
app.listen(port, ()=> console.log(`Listening on port ${port}..`))