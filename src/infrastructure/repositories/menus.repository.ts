import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import RepositoryMaster from "./repository.master";
import MenusEntity from "../entity/menus.entity";

@Injectable()
export default class MenusRepository extends RepositoryMaster {

    constructor(
        private entity: MenusEntity,
        private emiter: EventEmitter2
    ) {
        super()
    }

}
