import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes'

dotenv.config()
const PORT = process.env.PORT || 4000

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/users', userRoutes)



app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})