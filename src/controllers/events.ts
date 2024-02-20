import { RequestHandler } from "express";
import * as eventsv from "../services/eventsv";
import * as peoplesv from "../services/peoplesv";
import { z } from "zod";
//import { json } from "stream/consumers";

export const getAll: RequestHandler = async (req, res) => {
    const items = await eventsv.getAll();
    console.log("items:"+items);
    if (items) return res.json({ events: items });
    res.json({ error: 'Ocorreu um erro' });
}

export const getEvent:RequestHandler = async (req, res) => {
    const { id } = req.params;
    const eventItem = await eventsv.getOne(parseInt(id));
    if (eventItem) return res.json({ events: eventItem });
    res.json({ error: 'Ocorreu um erro' });
}

export const addEvent: RequestHandler = async (req, res) => {
    const addEventSchema = z.object({
        title: z.string(),
        description: z.string(),
        grouped: z.boolean()
    });
    const body = addEventSchema.safeParse(req.body);
    if (!body.success) return res.json({ error: 'Dados Invalidos' });
    const newEvent = await eventsv.add(body.data);
    if (newEvent) return res.status(201).json({ events: newEvent });
    res.json({ error: 'Ocorreu um Erro' });
}

export const updateEvent:RequestHandler = async (req, res) => {
    const { id } = req.params;
    const addEventSchema = z.object({
        status: z.boolean().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        grouped: z.boolean().optional()
    });
    const body = addEventSchema.safeParse(req.body);
    const updated = {
        events: {},
        peoples: {}
    }
    if (!body.success) return res.json({ error: 'Dados Invalidos'});
    updated.events = await eventsv.update(parseInt(id), body.data);
    if (updated.events){
        const eventItem = await eventsv.getOne(parseInt(id));
        if (eventItem) {
            if ( eventItem.status) {
                // Todo: Fazer o sorteio
                const result = eventsv.doMatched(parseInt(id));
                console.log(result);
                if (!result) {
                    // return res.json({ error: "Grupos impossiveis de sortear! "});
                    updated.peoples = { error: "Grupos impossiveis de sortear! "};
                } else {
                    updated.peoples = await peoplesv.getAll(
                        { id_event: parseInt(id) }
                    );
                    // const peoples = null;
                    // if (peoples) return peoples;
                    // updated.peoples = peoples;
                }
            } else {
                // Todo: Limpar o Sorteio
                updated.peoples = await peoplesv.update(
                    { id_event: parseInt(id) }, 
                    { matched: '' }
                );
                // if (updatPeople) return res.json({ peoples: updatPeople });
            }
        }
        return res.status(201).json({ events: updated.events, peoples: updated.peoples });
    } 
    res.json({ error: 'Ocorreu um Erro' });
}

export const deleteEvent: RequestHandler = async (req, res) =>{
    const { id } = req.params;
    const deleteItem = await eventsv.remove(parseInt(id));
    if (deleteItem) return res.json({ events: deleteItem });
    res.json({ error: 'Ocorreu um erro' });
}