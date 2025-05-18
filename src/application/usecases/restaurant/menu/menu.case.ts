import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import MenuTemplate from "src/domain/config/templates/menu.template";
import MenusDto from "src/infrastructure/dto/menus.dto";
import MenusEntity from "src/infrastructure/entity/menus.entity";
import MenusRepository from "src/infrastructure/repositories/menus.repository";

@Injectable()
export default class MenuUsecase {

    constructor(
        private entity: MenusEntity,
        private repository: MenusRepository,
        private template: MenuTemplate
    ) { }

    public async createNewMenus({ data }: { data: MenusDto }) {

        const entity = await this.entity.create({
            data: {
                about: data.about,
                preparation: data.preparation,
                allergens: data.allergens,
                ingredients: data.ingredients,
                tags: data.tags,
                forPeople: data.forPeople,
                price: data.price,
                name: data.name,
                categoryReference: { connect: { id: data.categoryId } },
                restauranteReference: { connect: { id: data.restaurantId } },
                typeReference: { connect: { id: data.typeId } },
            },
            event: this.template.event({ body: data, type: `CREATE` })
        })

        return {
            error: false,
            body: entity,
            message: [`Menu creado.`]
        }
    }

    public async updateMenus({ data, id }: { data: MenusDto, id: string }) {
        const foundMenus = await this.entity.find({ filter: { id } });
        if (!foundMenus) return { error: true, message: [`Menu no encontrado.`] };

        const newData: Prisma.MenusUpdateInput = {} 

        if(data.about) newData.about = data.about;
        if(data.preparation) newData.preparation = data.preparation;
        if(data.allergens) newData.allergens = data.allergens;
        if(data.ingredients) newData.ingredients = data.ingredients;
        if(data.tags) newData.tags = data.tags;
        if(data.price) newData.price = data.price;
        if(data.forPeople) newData.forPeople = data.forPeople;
        if(data.name) newData.name = data.name;
        if(data.typeId) newData.typeReference = {connect:{id:data.typeId}};
        if(data.categoryId) newData.categoryReference = {connect:{id:data.categoryId}};

        const entity = await this.entity.update({
            data: newData,
            id,
            event: this.template.event({ body: data, type: `UPDATE` })
        })

        return {
            error: false,
            body: entity,
            message: [`Menu actualizado.`]
        }
    }

    public async deleteMenus({ id }: { id: string }) {
        console.log(id);
        const entity = await this.entity.delete({ id, event: this.template.event({ body: { id }, type: `DELETE` }) });

        return {
            error: false,
            body: entity,
            message: [`Menu eliminado.`]
        }
    }

    public async findMenus({ id }: { id: string }) {
        const entity = await this.entity.find({ filter: { AND: [{ id }, { deleteAt: null }] } });

        return entity ? { body: entity, message: [`Menu encontrado`] } : { error: true, message: [`Menu no encontrado`], body: null }
    }

    public async paginateMenus({ param, skip, take,categoryId,typeId }: { skip: number, take: number, param?: string,categoryId?: string, typeId?:string }) {
        const filter: Prisma.MenusWhereInput[] = [];

        filter.push({ deleteAt: null });
        if (param) {
            filter.push({
                OR: [
                    { name: { contains: param } },
                    { about: { contains: param } },
                ]
            })
        }

        if(categoryId) filter.push({ categoryId:categoryId });
        if(typeId) filter.push({ typeId: typeId });

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
            message: [`Menus obtenidos.`],
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

