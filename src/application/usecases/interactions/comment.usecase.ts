import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import CommentTemplate from "src/domain/config/templates/interactions/comment.template";
import CommentDto from "src/infrastructure/dto/comment.dto";
import CommentEntity from "src/infrastructure/entity/interactions/comment.entity";
import CommentRepository from "src/infrastructure/repositories/interactions/comment.repository";

@Injectable()
export default class CommentUsecase {

    constructor(
        private entity: CommentEntity,
        private repository: CommentRepository,
        private template: CommentTemplate
    ) { }

    public async createNewComment({ data, user }: { data: CommentDto, user: User }) {

        let create: Prisma.CommentCreateInput = {
            stars: data.stars,
            comment: data.comment,
            userLogReference: { connect:{ id:user.id } },
        }
        
        if(data.menuId) create = {...create, menueReference: { connect: {id:data.menuId} }};
        if(data.restaurantId) create = {...create, restaurantReference: { connect: {id:data.restaurantId} }};

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

    public async updateComment({ data, id }: { data: CommentDto, id: string }) {
        const foundComment = await this.entity.find({ filter: { id } });
        if (!foundComment) return { error: true, message: [`Tipo no encontrado.`] };

        const entity = await this.entity.update({
            data: { ...data },
            id,
            event: this.template.event({ body: data, type: `UPDATE` })
        })

        return {
            error: false,
            body: entity,
            message: [`Comentario creado.`]
        }
    }

    public async deleteComment({ id }: { id: string }) {
        const entity = await this.entity.delete({ id, event: this.template.event({ body: { id }, type: `DELETE` }) });

        return {
            error: false,
            body: entity,
            message: [`Tipo eliminado.`]
        }
    }

    public async findComment({ id }: { id: string }) {
        const entity = await this.entity.find({ filter: { AND: [{ id }, { deleteAt: null }] } });

        return entity ? { body: entity, message: [`Tipo encontrado`] } : { error: true, message: [`Tipo no encontrado`], body: null }
    }

    public async paginateComment({ param, skip, take }: { skip: number, take: number, param?: string }) {
        const filter: Prisma.CommentWhereInput[] = [];

        filter.push({ deleteAt: null });
        if (param) {
            filter.push({
                OR: [
                    { comment: { contains: param } },
                    { menueReference: { name:{ contains: param } } },
                    { restaurantReference: { name:{ contains: param } } },
                    { userLogReference: { OR:[{name:{ contains: param }},{lastname:{ contains: param }},{email:{ contains: param }}] } },
                ]
            })
        }

        const paginatePromise = this.entity.filter({ filter: { AND: filter }, skip, take });
        const countPromise = this.entity.count({ filter: { AND: filter } });

        const paginate = await paginatePromise;
        const count = await countPromise;

        return {
            message: [`Comentario obtenidos.`],
            body: {
                data: paginate,
                count,
            }
        }
    }
}

