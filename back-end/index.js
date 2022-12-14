import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
import profileRoutes from './routes/profiles.js'
import imageRoutes from './routes/images.js'

const app = express()
dotenv.config()


app.use(bodyParser.json({ limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true}))
app.use(cors())

app.use('/posts', postRoutes)
app.use('/user', userRoutes)
app.use('/profile', profileRoutes)
app.use('/image', imageRoutes)
app.use('/uploads', express.static('uploads'))


const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))