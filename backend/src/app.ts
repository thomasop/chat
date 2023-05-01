import express from "express"
import Login from "./routes/Login.js"
import connect from "./database/connect.js"
import bodyParser from "body-parser"
import cors from "cors"

let app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

Login(app, connect)
export default app