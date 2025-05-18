import { Prisma } from "@prisma/client";
import EntityInfraestructure from "../entity.master";
import { EventType } from "../../dto/interfaces/event.interface";
import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { PrismaService } from "src/infrastructure/services/prisma.service";

@Injectable()
export default class TypeEntity extends EntityInfraestructure {

    constructor(
        private emiter: EventEmitter2,
        private prisma: PrismaService
    ) {
        super()
    }

    public async create ({data, event}:{data:Prisma.TypeCreateInput, event?: EventType}) {
        this.emiter.emit(this.CREATE, event); // Dispath pre event
        const entityPromise = this.prisma.type.create({ data:{...data,deleteAt:null} });; // Create promise
        this.emiter.emit(this.CREATE, event); // Distact post event
        const entity = await entityPromise; // await promise
        return entity;
    }

    public async update ({id, data, event}:{id: string, data:Prisma.TypeUpdateInput, event?: EventType}) {
        this.emiter.emit(this.UPDATE, event); // Dispath pre event
        const entityPromise = this.prisma.type.update({ data:{ name: data.name }, where:{ id } }); // Update promise
        this.emiter.emit(this.UPDATE, event); // Distact post event
        const entity = await entityPromise; // await promise
        return entity;
    }

    public async delete ({id, event}:{id: string, event?: EventType}) {
        this.emiter.emit(this.DELETE, event); // Dispath pre event
        const entityPromise = this.prisma.type.update({ data:{deleteAt:new Date()}, where:{ id } }); // DELETE promise
        this.emiter.emit(this.DELETE, event); // Distact post event
        const entity = await entityPromise; // await promise
        return entity;
    }

    public async find ({filter, event,select}:{filter: Prisma.TypeWhereInput, select?:Prisma.TypeSelect, event?: EventType}) {
        this.emiter.emit(this.DELETE, event); // Dispath pre event
        const entityPromise = this.prisma.type.findFirst({ 
            select: select ? select : {
                _count: true,
                name: true,
                createAt: true,
                deleteAt: true,
                updateAt: true,
                id: true
            },
            where:filter 
        }); // DELETE promise
        this.emiter.emit(this.DELETE, event); // Distact post event
        const entity = await entityPromise; // await promise
        return entity;
    }


    public async filter ({filter, event,skip,take,select}:{filter: Prisma.TypeWhereInput, select?:Prisma.TypeSelect, skip: number, take: number, event?: EventType}) {
        // this.emiter.emit(this.FILTER, event); // Dispath pre event
        const entityPromise = this.prisma.type.findMany({
            skip,
            take,
            select: select ? select : {
                _count: true,
                name: true,
                createAt: true,
                deleteAt: true,
                updateAt: true,
                id: true
            }, 
            where:filter 
        }); // Filter promise
        // this.emiter.emit(this.FILTER, event); // Distact post event
        const entity = await entityPromise; // await promise
        return entity;
    }

    public async count ({filter}:{filter: Prisma.TypeWhereInput}) {
        const entityPromise = this.prisma.type.count({ where:filter }); // COUNT promise
        const entity = await entityPromise; // await promise
        return entity;
    }
}
