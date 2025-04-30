import { Injectable } from "@nestjs/common";
import CategoryDto from "src/infrastructure/dto/core/category.dto";
import CategoryEntity from "src/infrastructure/entity/core/category.entity";
import CategoryRepository from "src/infrastructure/repositories/core/category.repository";

@Injectable()
export default class CategoryFaker {
    constructor(
        private categoryEntity: CategoryEntity,
        private categoryRepository: CategoryRepository,
    ) { }

    public async create(count?: number) {
        const data = await this.getData(count ? count : 1);
        const results: CategoryDto[] = [];

        data.forEach(async (item) => {
            (async () => {
                const found = await this.categoryEntity.find({ filter:{ name:item } });
                console.log(found);
                if(!found) results.push(await this.categoryEntity.create({ data:{ name:item } }));
            })()
        })
        
        return results
    }

    private async getData(count: number) {
        return [
            'Italiana',
            'Mexicana',
            'Asiática',
            'Vegetariana',
            'Mariscos',
            'Carnes',
            'Postres',
            'Ensaladas'
        ];
    }
}
