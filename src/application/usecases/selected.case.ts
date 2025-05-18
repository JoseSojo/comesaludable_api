import { Injectable } from "@nestjs/common";
import { SearchInterface, SearchResponseInterface } from "src/infrastructure/dto/interfaces/SearchInterface";
import CategoryEntity from "src/infrastructure/entity/core/category.entity";
import EnvirontmentEntity from "src/infrastructure/entity/core/environtment.entity";
import TypeEntity from "src/infrastructure/entity/core/type.entity";

@Injectable()
export default class SelectedUsecase {
    
    constructor(
        private typeEntity: TypeEntity,
        private environmentEntity: EnvirontmentEntity,
        private categoryEntity: CategoryEntity
    ) {}

    public async findType ({ param }: {param:string}): Promise<SearchResponseInterface> {
        const result = await this.typeEntity.filter({ 
            filter:{ AND:[{deleteAt:null},{name:{contains:param}}] },
            select: { id: true, name: true },
            skip: 0,
            take: 15
        });
        const customResponse: SearchInterface[] = result.map((type) => ({ label:type.name,value:type.id }));
        return {
            body: customResponse,
            message: ``,
            error: false
        }
    }

    public async findEnvironment ({ param }: {param:string}): Promise<SearchResponseInterface> {
        const result = await this.environmentEntity.filter({ 
            filter:{ AND:[{deleteAt:null},{name:{contains:param}}] },
            select: { id: true, name: true },
            skip: 0,
            take: 15
        });
        const customResponse: SearchInterface[] = result.map((type) => ({ label:type.name,value:type.id }));
        return {
            body: customResponse,
            message: ``,
            error: false
        }
    }

    public async findcategory ({ param }: {param:string}): Promise<SearchResponseInterface> {
        const result = await this.categoryEntity.filter({ 
            filter:{ AND:[{deleteAt:null},{name:{contains:param}}] },
            select: { id: true, name: true },
            skip: 0,
            take: 15
        });
        const customResponse: SearchInterface[] = result.map((type) => ({ label:type.name,value:type.id }));
        return {
            body: customResponse,
            message: ``,
            error: false
        }
    }
}

