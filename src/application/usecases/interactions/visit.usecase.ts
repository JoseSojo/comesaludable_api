import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import VisitTemplate from "src/domain/config/templates/interactions/visit.template";
import VisitDto from "src/infrastructure/dto/visit.dto";
import VisitEntity from "src/infrastructure/entity/interactions/visit.entity";
import VisitRepository from "src/infrastructure/repositories/interactions/visit.repository";

@Injectable()
export default class VisitUsecase {

    constructor(
        private entity: VisitEntity,
        private repository: VisitRepository,
        private template: VisitTemplate
    ) { }

    public async createNewVisit({ data, user }: { data: VisitDto, user: User }) {

        let create: Prisma.VisitsCreateInput = {
            userLog: { connect: { id: user.id } },
        }

        if (data.menuId) create = { ...create, menueReference: { connect: { id: data.menuId } } };
        if (data.restaurantId) create = { ...create, restaurantReference: { connect: { id: data.restaurantId } } };

        const entity = await this.entity.create({
            data: create,
            event: this.template.event({ body: data, type: `CREATE` })
        })

        return {
            error: false,
            body: entity,
            message: [`Tipo creado.`]
        }
    }

    public async deleteVisit({ id }: { id: string }) {
        const entity = await this.entity.delete({ id, event: this.template.event({ body: { id }, type: `DELETE` }) });

        return {
            error: false,
            body: entity,
            message: [`Visita eliminado.`]
        }
    }

    public async findVisit({ id }: { id: string }) {
        const entity = await this.entity.find({ filter: { AND: [{ id }, { deleteAt: null }] } });

        return entity ? { body: entity, message: [`Visita encontrado`] } : { error: true, message: [`Visita no encontrado`], body: null }
    }

    public async paginateVisit({ param, skip, take }: { skip: number, take: number, param?: string }) {
        const filter: Prisma.VisitsWhereInput[] = [];

        filter.push({ deleteAt: null });
        if (param) {
            filter.push({
                OR: [
                    { menueReference: { name: { contains: param } } },
                    { restaurantReference: { name: { contains: param } } },
                    { userLog: { OR: [{ name: { contains: param } }, { lastname: { contains: param } }, { email: { contains: param } }] } },
                ]
            })
        }

        const paginatePromise = this.entity.filter({ filter: { AND: filter }, skip, take });
        const countPromise = this.entity.count({ filter: { AND: filter } });

        const paginate = await paginatePromise;
        const count = await countPromise;

        return {
            message: [`Visita obtenidos.`],
            body: {
                data: paginate,
                count,
            }
        }
    }
}

