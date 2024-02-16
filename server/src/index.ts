import express from 'express'
import userRoutes from './routes/userRoutes'

const PORT = process.env.PORT || 4000
const app = express()


app.use('/users', userRoutes)




app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})