import express, { Request, Response, Router } from 'express'
import { requestIntercepter } from './utils/requestIntercepter';
import * as event from "./controllers/events";
import * as people from "./controllers/peoples";
import { siteRoutes } from './routes/site';
import { adminRoutes } from './routes/admin';

const app = express()
const port = process.env.PORT || 3000
const router = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.all('*', requestIntercepter);

// app.use('/', siteRoutes);
// app.use('/admin', adminRoutes);

app.get('/', (_req: Request, res: Response) => {
  return res.send('Express Typescript on Vercel')
})
app.get('/ping', (req, res) => { res.json({pong: true})});
app.get('/events/:id', event.getEvent);
app.get('/events/search/:id_event/:cpf', people.getSearch);
app.get('/events/search/:id_event', people.getSearch);

// app.get('/ping', (_req: Request, res: Response) => {
//   return res.send('pong 🏓')
// })

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`)
})

module.exports = app;