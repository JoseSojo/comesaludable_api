import { Injectable } from "@nestjs/common";
import TypeDto from "src/infrastructure/dto/core/type.dto";
import TypeEntity from "src/infrastructure/entity/core/type.entity";
import TypeRepository from "src/infrastructure/repositories/core/type.repository";

@Injectable()
export default class TypeFaker {
    
    constructor(
        private typeEntity: TypeEntity,
        private typeRepository: TypeRepository,
    ) { }

    public async create() {
        const data = await this.getData();
        const results: TypeDto[] = [];

        data.forEach(async (item) => {
            (async () => {
                const found = await this.typeEntity.find({ filter:{ name:item } });
                if(!found) results.push(await this.typeEntity.create({ data:{ name:item } }));
            })()
        })
        
        return results
    }

    private async getData() {
        return [
            "Italiana", "Mexicana", "Japonesa", "China", "India",
            "Mediterránea", "Árabe", "Americana", "Francesa", "Tailandesa",
            "Vegetariana", "Vegana", "Sin Gluten", "Mariscos", "Carnes",

            "Marisquería", "Parrilla", "Sushi Bar", "Pizzería", "Cafetería",
            "Cocina Fusión", "Buffet", "Comida Rápida", "Gourmet", "Temática",
          ]
    }
}

