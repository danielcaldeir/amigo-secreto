import { Router } from "express";
import * as auth from "../controllers/auth";
import * as event from "../controllers/events";
import * as group from "../controllers/groups";
import * as people from "../controllers/peoples";

const router = Router();

router.post('/login', auth.login);
router.get('/ping', auth.validate, (req, res) => { res.json({pong: true, admin: true})});

router.get('/events', auth.validate, event.getAll);
router.get('/events/:id', auth.validate, event.getEvent);
router.post('/events', auth.validate, event.addEvent);
router.put('/events/:id', auth.validate, event.updateEvent);
router.delete('/events/:id', auth.validate, event.deleteEvent);

router.get('/groups/:id_event', auth.validate, group.getAll);
router.get('/groups/:id_event/:id_group', auth.validate, group.getGroup);
router.post('/groups/:id_event', auth.validate, group.addGroup);
router.put('/groups/:id_event/:id_group', auth.validate, group.updateGroup);
router.delete('/groups/:id_event/:id_group', auth.validate, group.deleteGroup);

router.get('/peoples/group/:id_event/:id_group', auth.validate, people.getAll);
router.get('/peoples/event/:id_event', auth.validate, people.getAll);
router.get('/peoples/:id_event/:id_group/:id', auth.validate, people.getPeople);
router.get('/peoples/id/:id_event/:id', auth.validate, people.getPeople);
router.get('/peoples/cpf/:id_event/:cpf', auth.validate, people.getPeople);
router.post('/peoples/:id_event/:id_group', auth.validate, people.addPeople);
router.put('/peoples/:id_event/:id_group/:id', auth.validate, people.updatePeople);
router.delete('/peoples/:id_event/:id_group/:id', auth.validate, people.deletePeople);

export default router;
export const adminRoutes = router;