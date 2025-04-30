import { Injectable } from "@nestjs/common";
import RepositoryMaster from "../repository.master";
import { EventEmitter2 } from "@nestjs/event-emitter";
import CategoryEntity from "src/infrastructure/entity/core/category.entity";

@Injectable()
export default class CategoryRepository extends RepositoryMaster {

    constructor(
        private entity: CategoryEntity,
        private emiter: EventEmitter2
    ) {
        super()
    }

   
}
