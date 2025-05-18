import { Prisma } from "@prisma/client";
import EntityInfraestructure from "./entity.master";
import { EventType } from "../dto/interfaces/event.interface";
import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { PrismaService } from "../services/prisma.service";

@Injectable()
export default class UserEntity extends EntityInfraestructure {

    constructor(
        private emiter: EventEmitter2,
        private prisma: PrismaService
    ) {
        super()
    }

    public async create ({data, event}:{data:Prisma.UserCreateInput, event?: EventType}) {
        this.emiter.emit(this.CREATE, event); // Dispath pre event
        const entityPromise = this.prisma.user.create({ data:{...data,deleteAt:null} });; // Create promise
        this.emiter.emit(this.CREATE, event); // Distact post event
        const entity = await entityPromise; // await promise
        return entity;
    }

    public async update ({id, data, event}:{id: string, data:Prisma.UserUpdateInput, event?: EventType}) {
        this.emiter.emit(this.UPDATE, event); // Dispath pre event
        const entityPromise = this.prisma.user.update({ data, where:{ id } }); // Update promise
        this.emiter.emit(this.UPDATE, event); // Distact post event
        const entity = await entityPromise; // await promise
        return entity;
    }

    public async delete ({id, event}:{id: string, event?: EventType}) {
        this.emiter.emit(this.DELETE, event); // Dispath pre event
        const entityPromise = this.prisma.user.update({ data:{deleteAt:new Date()}, where:{ id } }); // DELETE promise
        this.emiter.emit(this.DELETE, event); // Distact post event
        const entity = await entityPromise; // await promise
        return entity;
    }

    public async find ({filter, event,select}:{filter: Prisma.UserWhereInput, select?:Prisma.UserSelect, event?: EventType}) {
        // this.emiter.emit(this.DELETE, event); // Dispath pre event
        const entityPromise = this.prisma.user.findFirst({ 
            select: select ? select : {
                _count: true,
                acceptEmail: true,
                email: true,
                lastname: true,
                name: true,
                age: true,
                password: true,
                createAt: true,
                deleteAt: true,
                updateAt: true,
                id: true,
                admin: true
            },
            where: filter 
        }); // DELETE promise
        // this.emiter.emit(this.DELETE, event); // Distact post event
        const entity = await entityPromise; // await promise
        return entity;
    }

    public async filter ({filter, event,skip,take,select}:{filter: Prisma.UserWhereInput, select?:Prisma.UserSelect, skip: number, take: number, event?: EventType}) {
        this.emiter.emit(this.FILTER, event); // Dispath pre event
        const entityPromise = this.prisma.user.findMany({
            skip,
            take,
            select: select ? select : {
                _count: true,
                acceptEmail: true,
                email: true,
                lastname: true,
                age: true,
                name: true,
                password: true,
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

    public async count ({filter}:{filter: Prisma.UserWhereInput}) {
        const entityPromise = this.prisma.user.count({ where:filter }); // COUNT promise
        const entity = await entityPromise; // await promise
        return entity;
    }
}
