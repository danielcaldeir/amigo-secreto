import { PrismaClient, Prisma } from "@prisma/client";
import * as peoplesv from "../services/peoplesv";
import { encryptMatch } from "../utils/match";

const prisma = new PrismaClient();

export const getAll = async () => {
    try {
        return await prisma.event.findMany();
    } catch (error) {
        return false;
    }
}

export const getOne = async (id: number) => {
    try {
        return await prisma.event.findFirst({ where: { id } });
    } catch (error) {
        return false;
    }
}

type EventsCreateData = Prisma.Args<typeof prisma.event, 'create'>['data'];
export const add = async (data: EventsCreateData) => {
    try {
        return await prisma.event.create({ data });
    } catch (error) {
        return false;
    }
}

type EventsUpdateData = Prisma.Args<typeof prisma.event, 'update'>['data'];
/**
 * 
 * @param id number
 * @param data Object<Prisma.event>
 * @returns Object | Boolean
 */
export const update = async (id: number, data: EventsUpdateData) => {
    try {
        return await prisma.event.update({ where: { id }, data });
    } catch (error) {
        return false;
    }
}

/**
 * 
 * @param id 
 * @returns Object | Boolean
 */
export const remove = async (id: number) => {
    try {
        return await prisma.event.delete({ where: { id } });
    } catch (error) {
        return false;
    }
}

/**
 * Evento: Evento Teste 2 --> ID: 2
 * --Grupo: Grupo A --> ID: 1
 * -----Name: Daniel Caldeira
 * -----Name: Jeane Caldeira
 * -----Name: Raquel Caldeira
 * --Grupo: Grupo B --> ID: 3
 * -----Name: Andrea Oliveira
 * -----Name: Carlos Oliveira
 * --Grupo: Grupo C --> ID: 4
 * -----Name: Mariana Nogueira
 * @param id 
 * @returns boolean
 */
export const doMatched = async (id:number): Promise<Boolean | Object> => {
    const eventItem = await getOne(id);
    if (eventItem){
        if (eventItem.status) {
            // Todo: Fazer o sorteio
            // const result = eventsv.doMatched(id);
            // if (!result) {
            //     return res.json({ error: "Grupos impossiveis de sortear! "});
            // }
            const peopleList = await peoplesv.getAll({ id_event: id });
            if (peopleList) {
                let sortedList:{id: number, match:number}[] = [];
                let sortable: number[] = [];

                let attempts = 0;
                let maxAttempts = peopleList.length;
                let keepTrying = true;
                while (keepTrying && attempts < maxAttempts) {
                    keepTrying = false;
                    attempts++;
                    sortedList = [];
                    sortable = peopleList.map(item => item.id);
                    for (let index in peopleList) {
                        let sortableFiltered: number[] = sortable;
                        
                        if (eventItem.grouped) {
                            sortableFiltered = sortable.filter(sortableItem => {
                                let sortablePerson = peopleList.find(item => item.id === sortableItem);
                                return peopleList[index].id_group !== sortablePerson?.id_group;
                            });
                        }
                        if ((sortableFiltered.length == 0) || (sortableFiltered.length === 1 && peopleList[index].id === sortableFiltered[0] )) {
                            keepTrying = true;
                        } else {
                            let sortedIndex = Math.floor(Math.random() * sortableFiltered.length);
                            while (sortableFiltered[sortedIndex] === peopleList[index].id) {
                                sortedIndex = Math.floor(Math.random() * sortableFiltered.length);
                            }
                            sortedList.push({
                                id: peopleList[index].id, 
                                match: sortableFiltered[sortedIndex]
                            });
                            sortable = sortable.filter(item => item !== sortableFiltered[sortedIndex]);

                        }
                    }
                }
                console.log('Attempts: '+attempts);
                console.log('MaxAttempts: '+maxAttempts);
                console.log('sortedList: ');
                console.log(sortedList);
                if (attempts < maxAttempts) {
                    for (let index in sortedList) {
                        await peoplesv.update({
                                id: sortedList[index].id, 
                                id_event: id
                            }, { matched: encryptMatch(sortedList[index].match)  }
                        );
                    }
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            // Todo: Limpar o Sorteio
            const peoples = await peoplesv.update(
                { id_event: id }, 
                { matched: '' }
            );
            // if (peoples) return peoples;
            return false;
        }
    }
    return false;
}