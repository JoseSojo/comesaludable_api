import { Prisma } from "@prisma/client";
import EntityInfraestructure from "./entity.master";
import { EventType } from "../dto/interfaces/event.interface";
import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { PrismaService } from "../services/prisma.service";

@Injectable()
export default class RestaurantEntity extends EntityInfraestructure {

    constructor(
        private emiter: EventEmitter2,
        private prisma: PrismaService
    ) {
        super()
    }

    public async create ({data, event}:{data:Prisma.RestaurantsCreateInput, event?: EventType}) {
        this.emiter.emit(this.CREATE, event); // Dispath pre event
        const entityPromise = this.prisma.restaurants.create({ data:{...data,deleteAt:null} });; // Create promise
        this.emiter.emit(this.CREATE, event); // Distact post event
        const entity = await entityPromise; // await promise
        return entity;
    }

    public async update ({id, data, event}:{id: string, data:Prisma.RestaurantsUpdateInput, event?: EventType}) {
        this.emiter.emit(this.UPDATE, event); // Dispath pre event
        const entityPromise = this.prisma.restaurants.update({ data, where:{ id } }); // Update promise
        this.emiter.emit(this.UPDATE, event); // Distact post event
        const entity = await entityPromise; // await promise
        return entity;
    }

    public async delete ({id, event}:{id: string, event?: EventType}) {
        this.emiter.emit(this.DELETE, event); // Dispath pre event
        const entityPromise = this.prisma.restaurants.update({ data:{deleteAt:new Date()}, where:{ id } }); // DELETE promise
        this.emiter.emit(this.DELETE, event); // Distact post event
        const entity = await entityPromise; // await promise
        return entity;
    }

    public async find ({filter, event,select}:{filter: Prisma.RestaurantsWhereInput, select?:Prisma.RestaurantsSelect, event?: EventType}) {
        this.emiter.emit(this.DELETE, event); // Dispath pre event
        const entityPromise = this.prisma.restaurants.findFirst({ 
            select: select ? select : {
                _count: true,
                about: true,
                access: true,
                address: true,
                horario: true,
                name: true,
                phone: true,
                tag: true,
                website: true,
                typeReference: true,
                environmentReference: true,
                createAt: true,
                deleteAt: true,
                updateAt: true,
                id: true,
            },
            where:filter 
        }); // DELETE promise
        this.emiter.emit(this.DELETE, event); // Distact post event
        const entity = await entityPromise; // await promise
        return entity;
    }

    public async filter ({filter, event,skip,take,select,order}:{order?: Prisma.RestaurantsOrderByWithRelationInput,filter: Prisma.RestaurantsWhereInput, select?:Prisma.RestaurantsSelect, skip: number, take: number, event?: EventType}) {
        this.emiter.emit(this.FILTER, event); // Dispath pre event
        const entityPromise = this.prisma.restaurants.findMany({
            skip,
            take,
            orderBy: order ? order : { createAt: `asc` },
            select: select ? select : {
                _count: true,
                about: true,
                access: true,
                address: true,
                horario: true,
                name: true,
                phone: true,
                tag: true,
                website: true,
                typeReference: true,
                environmentReference: true,
                createAt: true,
                deleteAt: true,
                updateAt: true,
                id: true
            }, 
            where:filter 
        }); // Filter promise
        this.emiter.emit(this.FILTER, event); // Distact post event
        const entity = await entityPromise; // await promise
        return entity;
    }

    public async count ({filter}:{filter: Prisma.RestaurantsWhereInput}) {
        const entityPromise = this.prisma.restaurants.count({ where:filter }); // COUNT promise
        const entity = await entityPromise; // await promise
        return entity;
    }
}
