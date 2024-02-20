import { RequestHandler } from "express";
import * as groupsv from "../services/groupsv";
import { z } from "zod";

export const getAll: RequestHandler = async (req, res) => {
    const { id_event } = req.params;
    const items = await groupsv.getAll( parseInt(id_event) );
    if (items) return res.json({ groups: items });
    res.json({ error: 'Ocorreu um erro' });
}

export const getGroup:RequestHandler = async (req, res) => {
    const { id_event, id_group } = req.params;
    const groupItem = await groupsv.getOne({
        id: parseInt(id_group),
        id_event: parseInt(id_event)
    });
    if (groupItem) return res.json({ groups: groupItem });
    res.json({ error: 'Ocorreu um erro' });
}

export const addGroup: RequestHandler = async (req, res) => {
    const addGroupSchema = z.object({
        name: z.string()
    });
    const { id_event } = req.params;
    const body = addGroupSchema.safeParse(req.body);
    if (!body.success) return res.json({ error: 'Dados Invalidos' });
    const newGroup = await groupsv.add({
        ... body.data,
        id_event: parseInt(id_event)
    });
    if (newGroup) return res.status(201).json({ groups: newGroup });
    res.json({ error: 'Ocorreu um Erro' });
}

export const updateGroup:RequestHandler = async (req, res) => {
    const updateGroupSchema = z.object({
        name: z.string().optional()
    });
    const { id_event, id_group } = req.params;
    const body = updateGroupSchema.safeParse(req.body);
    if (!body.success) return res.json({ error: 'Dados Invalidos'});
    const updatGroup = await groupsv.update({
        id: parseInt(id_group),
        id_event: parseInt(id_event)
    }, body.data);
    if (updatGroup){
        return res.status(201).json({ groups: updatGroup });
    } 
    res.json({ error: 'Ocorreu um Erro' });
}

export const deleteGroup: RequestHandler = async (req, res) => {
    const { id_event, id_group } = req.params;
    const deleteItem = await groupsv.remove({
        id: parseInt(id_group),
        id_event: parseInt(id_event)
    });
    if (deleteItem) return res.json({ groups: deleteItem });
    res.json({ error: 'Ocorreu um erro' });
}