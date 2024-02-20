import { Prisma, PrismaClient } from "@prisma/client";
import * as eventsv from "../services/eventsv";

const prisma = new PrismaClient();
type GroupsFilters = {id: number, id_event?: number}

export const getAll = async (id_event: number) => {
    try {
        return await prisma.group.findMany({ where: { id_event } });
    } catch (error) {
        return false;
    }
}

// type GetOneFilters = {id: number; id_event?: number;}
export const getOne = async (filteres: GroupsFilters) => {
    try {
        return await prisma.group.findFirst({ where: filteres });
    } catch (error) {
        return false;
    }
}

type GroupsCreateData = Prisma.Args<typeof prisma.group, 'create'>['data'];
export const add = async (data: GroupsCreateData) => {
    try {
        if (!data.id_event) return false;
        const eventItem = await eventsv.getOne(data.id_event);
        if (!eventItem) return false;
        return await prisma.group.create({ data });
    } catch (error) {
        return false;
    }
}

// type UpdateFilters = {id: number, id_event?: number}
type GroupsUpdateData = Prisma.Args<typeof prisma.group, 'update'>['data'];
export const update = async (filteres: GroupsFilters, data: GroupsUpdateData) => {
    try {
        return await prisma.group.update({ where: filteres, data });
    } catch (error) {
        return false;
    }
}

// type DeleteFilters = {id: number, id_event?: number}
export const remove = async (filters: GroupsFilters) => {
    try {
        return await prisma.group.delete({ where: filters });
    } catch (error) {
        return false;
    }
}