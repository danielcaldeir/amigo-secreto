import express, { Request, Response, Router } from 'express'

const app = express()
const port = process.env.PORT || 3000
const router = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req: Request, res: Response) => {
  return res.send('Express Typescript on Vercel')
})

app.get('/ping', (_req: Request, res: Response) => {
  return res.send('pong 🏓')
})

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`)
})

module.exports = app;