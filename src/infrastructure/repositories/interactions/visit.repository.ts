import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import RepositoryMaster from "../repository.master";
import VisitEntity from "src/infrastructure/entity/interactions/visit.entity";

@Injectable()
export default class VisitRepository extends RepositoryMaster {

    constructor(
        private entity: VisitEntity,
        private emiter: EventEmitter2
    ) {
        super()
    }
    
}
