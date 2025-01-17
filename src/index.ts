import express from 'express'
import { Request, Response } from 'express'
import dotenv from 'dotenv'
import noteRoutes from './routes/noteRoutes'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/notes', noteRoutes)

app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack)
  res.status(500).json({ error: err.message || 'Internal Server Error' })
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
