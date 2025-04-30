import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import RepositoryMaster from "./repository.master";
import LocationEntity from "../entity/location.entity";

@Injectable()
export default class LocationRepository extends RepositoryMaster {

    constructor(
        private entity: LocationEntity,
        private emiter: EventEmitter2
    ) {
        super()
    }
}
