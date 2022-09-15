import express, { Application, Request, Response } from 'express'
import * as dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3000
const app: Application = express()

app.get('/', (req: Request, res: Response) => {
  res.send('Hi there!')
})

app.listen(PORT, () => {
  console.log(`Server is up at prot:${PORT}`)
})

export default app
