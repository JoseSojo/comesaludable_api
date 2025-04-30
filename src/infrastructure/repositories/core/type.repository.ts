import { Injectable } from "@nestjs/common";
import RepositoryMaster from "../repository.master";
import { EventEmitter2 } from "@nestjs/event-emitter";
import TypeEntity from "src/infrastructure/entity/core/type.entity";

@Injectable()
export default class TypeRepository extends RepositoryMaster {

    constructor(
        private entity: TypeEntity,
        private emiter: EventEmitter2
    ) {
        super()
    }
}
