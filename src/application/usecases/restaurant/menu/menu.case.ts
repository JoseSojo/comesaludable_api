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
                ...data,
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

        const entity = await this.entity.update({
            data: { ...data },
            id,
            event: this.template.event({ body: data, type: `UPDATE` })
        })

        return {
            error: false,
            body: entity,
            message: [`Menu creado.`]
        }
    }

    public async deleteMenus({ id }: { id: string }) {
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

    public async paginateMenus({ param, skip, take }: { skip: number, take: number, param?: string }) {
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

        const paginatePromise = this.entity.filter({ filter: { AND: filter }, skip, take });
        const countPromise = this.entity.count({ filter: { AND: filter } });

        const paginate = await paginatePromise;
        const count = await countPromise;

        return {
            message: [`Menus obtenidos.`],
            body: {
                data: paginate,
                count,
            }
        }
    }
}

