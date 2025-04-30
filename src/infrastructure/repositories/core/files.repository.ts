import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import RepositoryMaster from "../repository.master";
import FilesEntity from "src/infrastructure/entity/core/files.entity";

@Injectable()
export default class FilesRepository extends RepositoryMaster {

    constructor(
        private entity: FilesEntity,
        private emiter: EventEmitter2
    ) {
        super()
    }
}
