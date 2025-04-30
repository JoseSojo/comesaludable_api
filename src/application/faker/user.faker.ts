import { Injectable } from "@nestjs/common";
import { UserRegisterDto } from "src/infrastructure/dto/user.dto";
import UserEntity from "src/infrastructure/entity/user.entity";
import UserRepository from "src/infrastructure/repositories/user.repository";
import { faker } from '@faker-js/faker';

@Injectable()
export default class UserFaker {

    constructor(
        private userEntity: UserEntity,
        private userRepository: UserRepository,
    ) { }

    public async create(count?: number) {
        const data = await this.getData(count ? count : 1);
        const results = [];

        data.forEach(async (item) => {
            const entity = await this.userEntity.create({ data:item });
            results.push(entity);
        });
        
        return results;
    }

    private async getData(count: number) {
        const user: UserRegisterDto[] = [];
        const hash = await this.userRepository.hash(`abc.12345`);

        for (let i = 0; i < count; i++) {
            const genero = faker.person.sexType()
            const name = faker.person.firstName(genero);
            const lastname = faker.person.lastName(genero);
            user.push({
                acceptEmail: `si`,
                email: `${name}-${lastname}@example.com`,
                lastname,
                name,
                password: hash,
                age: `22`
            })
        }

        return user;
    }

}

