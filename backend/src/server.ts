import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRouter from './routes/authRoutes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config()

const dbUrl = process.env.DB_URL || ""

mongoose.connect(dbUrl)
.then(() => app.listen(process.env.SERVER_PORT, () => console.log('server running on port: ' + process.env.SERVER_PORT)))
.catch(err => console.log(err))

const db = mongoose.connection
db.once('open', () => console.log('connected to db successfully'))


const app = express()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(cookieParser())
app.use(authRouter)

app.get('/', (req, res) => {
    res.send({ message: 'hi there 222' })
})
