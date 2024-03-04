import express, { Request, Response, Router } from 'express'
import { requestIntercepter } from './utils/requestIntercepter';
import { siteRoutes } from './routes/site';
import { adminRoutes } from './routes/admin';

const app = express()
const port = process.env.PORT || 3000
const router = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.all('*', requestIntercepter);

app.use('/', siteRoutes);
app.use('/admin', adminRoutes);

// app.get('/', (_req: Request, res: Response) => {
//   return res.send('Express Typescript on Vercel')
// })

// app.get('/ping', (_req: Request, res: Response) => {
//   return res.send('pong 🏓')
// })

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`)
})

module.exports = app;