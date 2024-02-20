import { Prisma, PrismaClient } from "@prisma/client";
import * as eventsv from "../services/eventsv";
import * as groupsv from "../services/groupsv";

const prisma = new PrismaClient();

type GetAllFilters = {id_event: number; id_group?:number;}
export const getAll = async (filters: GetAllFilters) => {
    try {
        return await prisma.people.findMany({ where: filters });
    } catch (error) {
        return false;
    }
}

type GetOneFilters = {id_event: number; id_group?: number; id?: number; cpf?:string;}
export const getOne = async (filteres: GetOneFilters) => {
    try {
        if (!filteres.id && !filteres.cpf) return false;
        return await prisma.people.findFirst({ where: filteres });
    } catch (error) {
        return false;
    }
}

type GroupsCreateData = Prisma.Args<typeof prisma.people, 'create'>['data'];
export const add = async (data: GroupsCreateData) => {
    try {
        if (!data.id_event) return false;
        if (!data.id_group) return false;
        const eventItem = await eventsv.getOne(data.id_event);
        if (!eventItem) return false;
        const groupItem = await groupsv.getOne({ id: data.id_group, id_event: data.id_event});
        if (!groupItem) return false;
        return await prisma.people.create({ data });
    } catch (error) {
        return false;
    }
}

type UpdateFilters = {id?: number, id_event: number, id_group?: number;}
type GroupsUpdateData = Prisma.Args<typeof prisma.people, 'update'>['data'];
export const update = async (filteres: UpdateFilters, data: GroupsUpdateData) => {
    try {
        return await prisma.people.updateMany({ where: filteres, data });
    } catch (error) {
        return false;
    }
}

type DeleteFilters = {id: number, id_event?: number, id_group?: number;}
export const remove = async (filters: DeleteFilters) => {
    try {
        return await prisma.people.delete({ where: filters });
    } catch (error) {
        return false;
    }
}