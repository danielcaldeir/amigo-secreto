import { RequestHandler } from "express";
import * as peoplesv from "../services/peoplesv";
import { number, z } from "zod";
import { decryptMatch } from "../utils/match";
//import { type } from "os";

export const getAll: RequestHandler = async (req, res) => {
    const { id_event, id_group } = req.params;
    if (!id_group) {
        const items = await peoplesv.getAll({ id_event: parseInt(id_event) });
        if (items) return res.json({ peoples: items });
    } else {
        const items = await peoplesv.getAll({ 
            id_event: parseInt(id_event),
            id_group: parseInt(id_group)
        });
        if (items) return res.json({ peoples: items });
    }
    // const items = await peoplesv.getAll( filters );
    // if (items) return res.json({ peoples: items });
    res.json({ error: 'Ocorreu um erro' });
}

export const getPeople:RequestHandler = async (req, res) => {
    const { id_event, id_group, id, cpf } = req.params;
    if (!cpf) {
        if (!id_group) {
            const peopleItem = await peoplesv.getOne({
                id_event: parseInt(id_event),
                id: parseInt(id)
            });
            if (peopleItem) return res.json({ peoples: peopleItem });
        } else {
            const peopleItem = await peoplesv.getOne({
                id_event: parseInt(id_event),
                id: parseInt(id),
                id_group: parseInt(id_group)
            });
            if (peopleItem) return res.json({ peoples: peopleItem });
        }
    } else {
        const peopleItem = await peoplesv.getOne({
            id_event: parseInt(id_event),
            cpf: cpf
        });
        if (peopleItem) return res.json({ peoples: peopleItem });
    }
    // const peopleItem = await peoplesv.getOne({
    //     id_event: parseInt(id_event),
    //     id: parseInt(id),
    //     id_group: parseInt(id_group)
    // });
    // if (peopleItem) return res.json({ peoples: peopleItem });
    res.json({ error: 'Ocorreu um erro' });
}

export const addPeople: RequestHandler = async (req, res) => {
    const addPeopleSchema = z.object({
        name: z.string(),
        cpf: z.string().transform(val => val.replace(/\.|-/gm,'')),
        matched: z.string().optional()
    });
    const { id_event, id_group } = req.params;
    const body = addPeopleSchema.safeParse(req.body);
    if (!body.success) return res.json({ error: 'Dados Invalidos' });
    const newPeople = await peoplesv.add({
        ... body.data,
        id_event: parseInt(id_event),
        id_group: parseInt(id_group)
    });
    if (newPeople) return res.status(201).json({ peoples: newPeople });
    res.json({ error: 'Ocorreu um Erro' });
}

export const updatePeople:RequestHandler = async (req, res) => {
    const updatePeopleSchema = z.object({
        name: z.string().optional(),
        cpf:  z.string().transform(val => val.replace(/\.|-/gm,'')).optional(),
        matched: z.string().optional()
    });
    const { id_event, id_group, id } = req.params;
    const body = updatePeopleSchema.safeParse(req.body);
    if (!body.success) return res.json({ error: 'Dados Invalidos'});
    const updatPeople = await peoplesv.update({
        id_event: parseInt(id_event),
        id: parseInt(id),
        id_group: parseInt(id_group)
    }, body.data);
    if (updatPeople){
        const peopleItem = await peoplesv.getOne({
            id_event: parseInt(id_event),
            id: parseInt(id)
        });
        if (peopleItem) return res.status(201).json({ peoples: peopleItem });
    } 
    res.json({ error: 'Ocorreu um Erro' });
}

export const deletePeople: RequestHandler = async (req, res) => {
    const { id_event, id_group, id} = req.params;
    const deleteItem = await peoplesv.remove({
        id: parseInt(id),
        id_group: parseInt(id_group),
        id_event: parseInt(id_event)
    });
    if (deleteItem) return res.json({ peoples: deleteItem });
    res.json({ error: 'Ocorreu um erro' });
}

export const getSearch:RequestHandler = async (req, res) => {
    const { id_event, cpf} = req.params;
    const searchSchema = z.object({
        cpf:  z.string().transform(val => val.replace(/\.|-/gm,'')).optional(),
    });
    const query = searchSchema.safeParse(req.query);
    if (!cpf) {
        if (!query.success) { return res.json({ error: "Dados Invalidos!" }) }
        const peopleItem = await peoplesv.getOne({
            id_event: parseInt(id_event),
            cpf: query.data.cpf
        });
        if (!peopleItem) return res.json({ error: "Nao foi encontrado o Item" });
        if (peopleItem && peopleItem.matched) {
            const matchId = decryptMatch(peopleItem.matched);
            const peopleMatched = await peoplesv.getOne({
                id_event: parseInt(id_event),
                id: (matchId)
            });
            if (peopleMatched){
                return res.json({
                    people: {id: peopleItem.id, name: peopleItem.name},
                    peopleMatched: {id: peopleMatched.id, name: peopleMatched.name}
                });
            }
        } else {
            res.json({ error: "Nao ocorreu o sorteio!"});
        }
    } else {
        const peopleItem = await peoplesv.getOne({
            id_event: parseInt(id_event),
            cpf: cpf
        });
        if (!peopleItem) return res.json({ error: "Nao foi encontrado o Item" });
        if (peopleItem && peopleItem.matched) {
            const matchId = decryptMatch(peopleItem.matched);
            const peopleMatched = await peoplesv.getOne({
                id_event: parseInt(id_event),
                id: matchId
            });
            if (peopleMatched){
                return res.json({
                    people: {id: peopleItem.id, name: peopleItem.name},
                    peopleMatched: {id: peopleMatched.id, name: peopleMatched.name}
                });
            }
        } else {
            return res.json({ error: "Nao ocorreu o sorteio!"});
        }
    }
    return res.json({error: "Ocorreu um error"});
}