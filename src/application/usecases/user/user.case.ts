import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import UserTemplate from "src/domain/config/templates/user.template";
import { UserRegisterDto, UserUpdateDto, UserUpdatePasswordDto } from "src/infrastructure/dto/user.dto";
import UserEntity from "src/infrastructure/entity/user.entity";
import UserRepository from "src/infrastructure/repositories/user.repository";

@Injectable()
export default class UserUsecase {

    constructor(
        private entity: UserEntity,
        private repository: UserRepository,
        private template: UserTemplate
    ) {}

    public async createNewUser({ data }: { data: UserRegisterDto }) {
        const found = await this.repository.validationEmail({ email: data.email });

        if (found) return found;

        const hash = await this.repository.hash(data.password);

        const entity = await this.entity.create({
            data: {
                ...data,
                password: hash
            },
            event: this.template.event({ body:data, type:`CREATE` })
        })

        return {
            error: false,
            body: entity,
            message: [`Usuario creado.`]
        }
    }

    public async updateUser({ data, id }: { data: UserUpdateDto, id: string }) {

        const foundUser = await this.entity.find({ filter: { id } });
        if (!foundUser) return { error: true, message: [`Usuario no encontrado.`] };

        const foundEmail = await this.repository.validationEmail({ email: data.email });
        if (foundEmail) return foundEmail;

        const entity = await this.entity.update({
            data: { ...data },
            id,
            event: this.template.event({ body:data, type:`UPDATE` })
        })

        return {
            error: false,
            body: entity,
            message: [`Usuario actualizado.`]
        }
    }

    public async updateUserPassword({ data, id }: { data: UserUpdatePasswordDto, id: string }) {
        const userFound = await this.entity.find({ filter: { id } });
        if (!userFound) return { error: true, message: [`Error al actualizar contraseña.`] };

        const found = await this.repository.compare(data.oldPassword, userFound.password);
        if (!found) return { error: true, message: [`Contraseña actual no coincide.`] };

        const hash = await this.repository.hash(data.password);
        const entity = await this.entity.update({ data: { password: hash }, id, event: this.template.event({ body:data, type:`UPDATE` }) });

        return {
            error: false,
            body: entity,
            message: [`Contraseña actualizada.`]
        }
    }

    public async deleteUser({ id }: { id: string }) {
        const entity = await this.entity.delete({ id, event: this.template.event({ body:{id}, type:`DELETE` }) });

        return {
            error: false,
            body: entity,
            message: [`Usuario eliminado.`]
        }
    }

    public async findUser({ id }: { id: string }) {
        const entity = await this.entity.find({ filter: { AND:[{ id },{ deleteAt:null }] } });

        return entity ? { body: entity, message: [`Usuario encontrado`] } : { error: true, message: [`Usuario no encontrado`], body: null }
    }

    public async paginateUser({ param, skip, take }: { skip: number, take: number, param?: string }) {
        const filter: Prisma.UserWhereInput[] = [];

        filter.push({ deleteAt: null });
        if (param) {
            filter.push({
                OR: [
                    { name: { contains: param } },
                    { lastname: { contains: param } },
                    { email: { contains: param } },
                    { age: { contains: param } },
                ]
            })
        }

        const paginatePromise = this.entity.filter({ filter: { AND: filter }, skip, take });
        const countPromise = this.entity.count({ filter: { AND: filter } });
        
        const paginate = await paginatePromise;
        const count = await countPromise;

        return {
            message: [`Usuarios obtenidos.`],
            body: {
                data: paginate,
                count,
            }
        }
    }
}

