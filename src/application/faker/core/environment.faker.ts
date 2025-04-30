import { Injectable } from "@nestjs/common";
import EnvironmentDto from "src/infrastructure/dto/core/environment.dto";
import EnvironmentEntity from "src/infrastructure/entity/core/environtment.entity";
import EnvironmentRepository from "src/infrastructure/repositories/core/environment.repository";

@Injectable()
export default class EnvironmentFaker {
    
    constructor(
        private environmentEntity: EnvironmentEntity,
        private environmentRepository: EnvironmentRepository,
    ) { }

    public async create() {
        const data = await this.getData();
        const results: EnvironmentDto[] = [];

        data.forEach(async (item) => {
            (async () => {
                const found = await this.environmentEntity.find({ filter:{ name:item } });
                if(!found) results.push(await this.environmentEntity.create({ data:{ name:item } }));
            })()
        })
        
        return results
    }

    private async getData() {
        return [
            "Familiar", "Romántico", "Ejecutivo", "Casual", "Lujoso",
            "Rústico", "Moderno", "Tradicional", "Bohemio", "Industrial"
          ]
    }
}

