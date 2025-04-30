import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import RepositoryMaster from "./repository.master";
import PhotoEntity from "../entity/photo.entity";

@Injectable()
export default class PhotoRepository extends RepositoryMaster {

    constructor(
        private entity: PhotoEntity,
        private emiter: EventEmitter2
    ) {
        super()
    }
}
