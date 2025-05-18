import { Menus, Prisma } from "@prisma/client";
import EntityInfraestructure from "./entity.master";
import { EventType } from "../dto/interfaces/event.interface";
import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { PrismaService } from "../services/prisma.service";

@Injectable()
export default class MenusEntity extends EntityInfraestructure {

    constructor(
        private emiter: EventEmitter2,
        private prisma: PrismaService
    ) {
        super()
    }

    public async create ({data, event}:{data:Prisma.MenusCreateInput, event?: EventType}) {
        this.emiter.emit(this.CREATE, event); // Dispath pre event
        const entityPromise = this.prisma.menus.create({ data:{...data,deleteAt:null} });; // Create promise
        this.emiter.emit(this.CREATE, event); // Distact post event
        const entity = await entityPromise; // await promise
        return entity;
    }

    public async update ({id, data, event}:{id: string, data:Prisma.MenusUpdateInput, event?: EventType}) {
        this.emiter.emit(this.UPDATE, event); // Dispath pre event
        const entityPromise = this.prisma.menus.update({ data, where:{ id } }); // Update promise
        this.emiter.emit(this.UPDATE, event); // Distact post event
        const entity = await entityPromise; // await promise
        return entity;
    }

    public async delete ({id, event}:{id: string, event?: EventType}) {
        this.emiter.emit(this.DELETE, event); // Dispath pre event
        const entityPromise = this.prisma.menus.update({ data:{deleteAt:new Date()}, where:{ id } }); // DELETE promise
        this.emiter.emit(this.DELETE, event); // Distact post event
        const entity = await entityPromise; // await promise
        return entity;
    }

    public async find ({filter, event,select}:{filter: Prisma.MenusWhereInput, select?:Prisma.MenusSelect, event?: EventType}) {
        this.emiter.emit(this.DELETE, event); // Dispath pre event
        const entityPromise = this.prisma.menus.findFirst({ 
            select: select ? select : {
                categoryReference: true,
                restauranteReference: true,
                _count: true,
                typeReference: true,
                createAt: true,
                deleteAt: true,
                updateAt: true,
                id: true,
                allergens: true,
                about: true,
                forPeople: true,
                ingredients: true,
                name: true,
                tags: true,
                price: true,
                preparation: true,
            },
            where:filter 
        }); // DELETE promise
        this.emiter.emit(this.DELETE, event); // Distact post event
        const entity = await entityPromise; // await promise
        return entity;
    }

    public async filter ({filter, event,skip,take,select,order}:{order?:Prisma.MenusOrderByWithRelationInput,filter: Prisma.MenusWhereInput, select?:Prisma.MenusSelect, skip: number, take: number, event?: EventType}) {
        this.emiter.emit(this.FILTER, event); // Dispath pre event
        const entityPromise = this.prisma.menus.findMany({
            skip,
            take,
            select: select ? select : {
                categoryReference: true,
                restauranteReference: true,
                _count: true,
                typeReference: true,
                createAt: true,
                deleteAt: true,
                updateAt: true,
                id: true,
                allergens: true,
                about: true,
                forPeople: true,
                ingredients: true,
                name: true,
                tags: true,
                price: true,
                preparation: true,
            }, 
            orderBy: order ? order : {createAt:"asc"},
            where:filter 
        }); // Filter promise
        this.emiter.emit(this.FILTER, event); // Distact post event
        const entity = await entityPromise; // await promise
        return entity;
    }

    public async count ({filter}:{filter: Prisma.MenusWhereInput}) {
        const entityPromise = this.prisma.menus.count({ where:filter }); // COUNT promise
        const entity = await entityPromise; // await promise
        return entity;
    }
}
