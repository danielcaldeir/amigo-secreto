import * as event from "../controllers/events";
import * as people from "../controllers/peoples";
import { Router } from "express";

const router = Router();

router.get('/ping', (req, res) => { res.json({pong: true})});
router.get('/events/:id', event.getEvent);
router.get('/events/search/:id_event/:cpf', people.getSearch);
router.get('/events/search/:id_event', people.getSearch);

export default router;
export const siteRoutes = router;