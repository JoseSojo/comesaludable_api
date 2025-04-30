import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import TypeTemplate from "src/domain/config/templates/core/type.template";
import TypeDto from "src/infrastructure/dto/core/type.dto";
import TypeEntity from "src/infrastructure/entity/core/type.entity";
import TypeRepository from "src/infrastructure/repositories/core/type.repository";

@Injectable()
export default class TypeUsecase {

    constructor(
        private entity: TypeEntity,
        private repository: TypeRepository,
        private template: TypeTemplate
    ) { }

    public async createNewType({ data }: { data: TypeDto }) {

        const entity = await this.entity.create({
            data: {
                ...data,
            },
            event: this.template.event({ body: data, type: `CREATE` })
        })

        return {
            error: false,
            body: entity,
            message: [`Tipo creado.`]
        }
    }

    public async updateType({ data, id }: { data: TypeDto, id: string }) {
        const foundType = await this.entity.find({ filter: { id } });
        if (!foundType) return { error: true, message: [`Tipo no encontrado.`] };

        const entity = await this.entity.update({
            data: { ...data },
            id,
            event: this.template.event({ body: data, type: `UPDATE` })
        })

        return {
            error: false,
            body: entity,
            message: [`Tipo creado.`]
        }
    }

    public async deleteType({ id }: { id: string }) {
        const entity = await this.entity.delete({ id, event: this.template.event({ body: { id }, type: `DELETE` }) });

        return {
            error: false,
            body: entity,
            message: [`Tipo eliminado.`]
        }
    }

    public async findType({ id }: { id: string }) {
        const entity = await this.entity.find({ filter: { AND: [{ id }, { deleteAt: null }] } });

        return entity ? { body: entity, message: [`Tipo encontrado`] } : { error: true, message: [`Tipo no encontrado`], body: null }
    }

    public async paginateType({ param, skip, take }: { skip: number, take: number, param?: string }) {
        const filter: Prisma.TypeWhereInput[] = [];

        filter.push({ deleteAt: null });
        if (param) {
            filter.push({
                OR: [
                    { name: { contains: param } },
                ]
            })
        }

        const paginatePromise = this.entity.filter({ filter: { AND: filter }, skip, take });
        const countPromise = this.entity.count({ filter: { AND: filter } });

        const paginate = await paginatePromise;
        const count = await countPromise;

        return {
            message: [`Type obtenidos.`],
            body: {
                data: paginate,
                count,
            }
        }
    }
}

