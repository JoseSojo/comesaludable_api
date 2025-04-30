import { Injectable } from "@nestjs/common";
import RepositoryMaster from "../repository.master";
import { EventEmitter2 } from "@nestjs/event-emitter";
import AnalyticEntity from "src/infrastructure/entity/interactions/analytic.entity";

@Injectable()
export default class AnalyticRepository extends RepositoryMaster {

    constructor(
        private entity: AnalyticEntity,
        private emiter: EventEmitter2
    ) {
        super()
    }
}
