import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import EnvirontmentTemplate from "src/domain/config/templates/core/environment.template";
import EnvirontmentDto from "src/infrastructure/dto/core/environment.dto";
import EnvirontmentEntity from "src/infrastructure/entity/core/environtment.entity";
import EnvirontmentRepository from "src/infrastructure/repositories/core/environment.repository";

@Injectable()
export default class EnvirontmenUsecase {

    constructor(
        private entity: EnvirontmentEntity,
        private repository: EnvirontmentRepository,
        private template: EnvirontmentTemplate
    ) { }

    public async createNewEnvirontment({ data }: { data: EnvirontmentDto }) {
        console.log(data);
        const entity = await this.entity.create({
            data: {
                ...data,
            },
            event: this.template.event({ body: data, type: `CREATE` })
        });

        return {
            error: false,
            body: entity,
            message: [`Ambiente creado.`]
        }
    }

    public async updateEnvirontment({ data, id }: { data: EnvirontmentDto, id: string }) {
        const foundEnvirontment = await this.entity.find({ filter: { id } });
        if (!foundEnvirontment) return { error: true, message: [`Ambiente no encontrado.`] };

        const entity = await this.entity.update({
            data: { ...data },
            id,
            event: this.template.event({ body: data, type: `UPDATE` })
        })

        return {
            error: false,
            body: entity,
            message: [`Ambiente creado.`]
        }
    }

    public async deleteEnvirontment({ id }: { id: string }) {
        const entity = await this.entity.delete({ id, event: this.template.event({ body: { id }, type: `DELETE` }) });

        return {
            error: false,
            body: entity,
            message: [`Ambiente eliminado.`]
        }
    }

    public async findEnvirontment({ id }: { id: string }) {
        const entity = await this.entity.find({ filter: { AND: [{ id }, { deleteAt: null }] } });

        return entity ? { body: entity, message: [`Ambiente encontrado`] } : { error: true, message: [`Ambiente no encontrado`], body: null }
    }

    public async paginateEnvirontment({ param, skip, take }: { skip: number, take: number, param?: string }) {
        const filter: Prisma.EnvironmentWhereInput[] = [];

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

        const currentPage = Math.floor(skip / take) + 1; // Calcula la página actual

        // Calcula metadatos de paginación
        const totalPages = Math.ceil(count / take);
        const hasNextPage = currentPage < totalPages;
        const hasPreviousPage = currentPage > 1;
        // Aquí termina la lógica de paginación

        return {
            message: [`Ambiente obtenidos.`],
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

