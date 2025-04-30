import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import RestaurantTemplate from "src/domain/config/templates/restaurant.template";
import RestaurantDto from "src/infrastructure/dto/restaurant.dto";
import RestaurantEntity from "src/infrastructure/entity/restaurant.entity";
import RestaurantRepository from "src/infrastructure/repositories/restaurant.repository";

@Injectable()
export default class RestaurantUsecase {

    constructor(
        private entity: RestaurantEntity,
        private repository: RestaurantRepository,
        private template: RestaurantTemplate
    ) { }

    public async createNewRestaurant({ data }: { data: RestaurantDto }) {

        const entity = await this.entity.create({
            data: {
                ...data,
                access: await this.repository.createAccess(),
                environmentReference: { connect:{ id:data.environmentId } },
                typeReference: { connect:{ id:data.typeId } },
            },
            event: this.template.event({ body: data, type: `CREATE` })
        })

        return {
            error: false,
            body: entity,
            message: [`Usuario creado.`]
        }
    }

    public async updateRestaurant({ data, id }: { data: RestaurantDto, id: string }) {
        const foundRestaurant = await this.entity.find({ filter: { id } });
        if (!foundRestaurant) return { error: true, message: [`Restaurante no encontrado.`] };

        const entity = await this.entity.update({
            data: { ...data },
            id,
            event: this.template.event({ body: data, type: `UPDATE` })
        })

        return {
            error: false,
            body: entity,
            message: [`Restaurante creado.`]
        }
    }

    public async deleteRestaurant({ id }: { id: string }) {
        const entity = await this.entity.delete({ id, event: this.template.event({ body: { id }, type: `DELETE` }) });

        return {
            error: false,
            body: entity,
            message: [`Restaurante eliminado.`]
        }
    }

    public async findRestaurant({ id }: { id: string }) {
        const entity = await this.entity.find({ filter: { AND: [{ id }, { deleteAt: null }] } });

        return entity ? { body: entity, message: [`Restaurante encontrado`] } : { error: true, message: [`Restaurante no encontrado`], body: null }
    }

    public async paginateRestaurant({ param, skip, take }: { skip: number, take: number, param?: string }) {
        const filter: Prisma.RestaurantsWhereInput[] = [];

        filter.push({ deleteAt: null });
        if (param) {
            filter.push({
                OR: [
                    { name: { contains: param } },
                    { access: { contains: param } },
                    { address: { contains: param } },
                    { horario: { contains: param } },
                ]
            })
        }

        const paginatePromise = this.entity.filter({ filter: { AND: filter }, skip, take });
        const countPromise = this.entity.count({ filter: { AND: filter } });

        const paginate = await paginatePromise;
        const count = await countPromise;

        return {
            message: [`Restaurantes obtenidos.`],
            body: {
                data: paginate,
                count,
            }
        }
    }

}

