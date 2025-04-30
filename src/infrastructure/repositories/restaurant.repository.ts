import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import RepositoryMaster from "./repository.master";
import RestaurantEntity from "../entity/restaurant.entity";
import { faker } from "@faker-js/faker";

@Injectable()
export default class RestaurantRepository extends RepositoryMaster {

    constructor(
        private entity: RestaurantEntity,
        private emiter: EventEmitter2
    ) {
        super()
    }

    public async createAccess() {
        let access = faker.string.numeric(7);
        const found = await this.entity.find({ filter: { access } });
        if (found) {
            access = faker.string.numeric(7);
            if (found) {
                access = faker.string.numeric(7);
                if (found) {
                    access = faker.string.numeric(7);
                    if (found) {
                        access = faker.string.numeric(7);
                    }
                }
            }
        }
        return access;
    }
}
