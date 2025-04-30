import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import RepositoryMaster from "../repository.master";
import CommentEntity from "src/infrastructure/entity/interactions/comment.entity";

@Injectable()
export default class CommentRepository extends RepositoryMaster {

    constructor(
        private entity: CommentEntity,
        private emiter: EventEmitter2
    ) {
        super()
    }

}
