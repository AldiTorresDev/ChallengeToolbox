import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import filesRoutes from './routes/filesRoutes.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/files', filesRoutes)

app.get('/', (req, res) => {
  res.send({
    message: 'Hello World'
  })
})

const port = process.env.PORT || 3000

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

export default app
