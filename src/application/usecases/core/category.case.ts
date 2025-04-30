import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import CategoryTemplate from "src/domain/config/templates/core/category.template";
import CategoryDto from "src/infrastructure/dto/core/category.dto";
import CategoryEntity from "src/infrastructure/entity/core/category.entity";
import CategoryRepository from "src/infrastructure/repositories/core/category.repository";

@Injectable()
export default class CategoryUsecase {

    constructor(
        private entity: CategoryEntity,
        private repository: CategoryRepository,
        private template: CategoryTemplate
    ) { }

    public async createNewCategory({ data }: { data: CategoryDto }) {
        const entity = await this.entity.create({
            data: {
                name: data.name,
            },
            event: this.template.event({ body: data, type: `CREATE` })
        })

        return {
            error: false,
            body: entity,
            message: [`Categoría creado.`]
        }
    }

    public async updateCategory({ data, id }: { data: CategoryDto, id: string }) {
        const foundCategory = await this.entity.find({ filter: { id } });
        if (!foundCategory) return { error: true, message: [`Categoría no encontrado.`] };

        const entity = await this.entity.update({
            data: { ...data },
            id,
            event: this.template.event({ body: data, type: `UPDATE` })
        })

        return {
            error: false,
            body: entity,
            message: [`Categoría creado.`]
        }
    }

    public async deleteCategory({ id }: { id: string }) {
        const entity = await this.entity.delete({ id, event: this.template.event({ body: { id }, type: `DELETE` }) });

        return {
            error: false,
            body: entity,
            message: [`Categoría eliminado.`]
        }
    }

    public async findCategory({ id }: { id: string }) {
        const entity = await this.entity.find({ filter: { AND: [{ id }, { deleteAt: null }] } });

        return entity ? { body: entity, message: [`Categoría encontrado`] } : { error: true, message: [`Categoría no encontrado`], body: null }
    }

    public async paginateCategory({ param, skip, take }: { skip: number, take: number, param?: string }) {
        const filter: Prisma.CategoryWhereInput[] = [];

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
            message: [`Category obtenidos.`],
            body: {
                data: paginate,
                count,
            }
        }
    }
}

