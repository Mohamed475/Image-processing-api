import express, { Application } from 'express'
import * as dotenv from 'dotenv'
import imageRoute from './routes/imageRoute'

dotenv.config()

const PORT = process.env.PORT || 3000
const app: Application = express()

// Our api route.
app.use('/api/images', imageRoute)

app.listen(PORT)

export default app
