import { Controller, Post, Query } from "@nestjs/common";
import CategoryFaker from "src/application/faker/core/category.faker";
import EnvironmentFaker from "src/application/faker/core/environment.faker";
import TypeFaker from "src/application/faker/core/type.faker";
import RestaurantFaker from "src/application/faker/restaurant.faker";
import UserFaker from "src/application/faker/user.faker";

@Controller(`faker`)
export default class FakeController {

    constructor(
        private userFaker: UserFaker,

        /* # # # CORE # # #  */
        private categoryFaker: CategoryFaker,
        private typeFaker: TypeFaker,
        private environmetFaker: EnvironmentFaker,

        /* # # # INSTANCE RESTAURANT # # # */
        private restaurantFaker: RestaurantFaker,
    ) {}

    @Post(`user/`)
    private async user(@Query() query: {count?: number}) {
        return this.userFaker.create(query.count);
    }

    @Post(`core/`)
    private async core(@Query() query: {count?: number}) {
        const categoryPromise = this.categoryFaker.create();
        const typePromise = this.typeFaker.create();
        const environmentPromise = this.environmetFaker.create();

        const category = await categoryPromise;
        const type = await typePromise;
        const environment = await environmentPromise;

        return {
            category,
            type,
            environment
        }
    }

    @Post(`instance/`)
    private async restaurant(@Query() query: {count?: number}) {
        return await this.restaurantFaker.create();
    }
}
