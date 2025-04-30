import { Injectable } from "@nestjs/common";
import RepositoryMaster from "../repository.master";
import { EventEmitter2 } from "@nestjs/event-emitter";
import EnvironmentEntity from "src/infrastructure/entity/core/environtment.entity";

@Injectable()
export default class EnvirontmentRepository extends RepositoryMaster {

    constructor(
        private entity: EnvironmentEntity,
        private emiter: EventEmitter2
    ) {
        super()
    }
}
