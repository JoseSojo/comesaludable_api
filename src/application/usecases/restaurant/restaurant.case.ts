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
                about: data.about,
                horario: data.horario,
                name: data.name,
                tag: data.tag,
                website: data.website,
                phone: data.phone,
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

        const newData: Prisma.RestaurantsUpdateInput = {} 

        if(data.about) newData.about = data.about;
        if(data.about) newData.about = data.about;
        if(data.horario) newData.horario = data.horario;
        if(data.tag) newData.tag = data.tag;
        if(data.phone) newData.phone = data.phone;
        if(data.website) newData.website = data.website;
        if(data.name) newData.name = data.name;
        if(data.typeId) newData.typeReference = {connect:{id:data.typeId}};
        if(data.environmentId) newData.environmentReference = {connect:{id:data.environmentId}};

        const entity = await this.entity.update({
            data: newData,
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

        const currentPage = Math.floor(skip / take) + 1; // Calcula la página actual

        // Calcula metadatos de paginación
        const totalPages = Math.ceil(count / take);
        const hasNextPage = currentPage < totalPages;
        const hasPreviousPage = currentPage > 1;
        // Aquí termina la lógica de paginación

        return {
            message: [`Restaurantes obtenidos.`],
            body: {
                data: paginate,
                count,
                pagination: { // Nuevo objeto meta con información de paginación
                    count,
                    currentPage,
                    totalPages,
                    itemsPerPage: take,
                    hasNextPage,
                    hasPreviousPage,
                    nextPage: hasNextPage ? currentPage + 1 : null,
                    previousPage: hasPreviousPage ? currentPage - 1 : null
                }
            }
        }
    }
}

