import { Injectable } from "@nestjs/common";
import RestaurantEntity from "src/infrastructure/entity/restaurant.entity";
import RestaurantRepository from "src/infrastructure/repositories/restaurant.repository";
import MenuFaker from "./menu.faker";
import TypeEntity from "src/infrastructure/entity/core/type.entity";
import { faker } from "@faker-js/faker";
import EnvironmentEntity from "src/infrastructure/entity/core/environtment.entity";
import LocationFaker from "./location.faker";

@Injectable()
export default class RestaurantFaker {

    constructor(
        private restaurantEntity: RestaurantEntity,
        private restaurantRepository: RestaurantRepository,

        private menuFaker: MenuFaker,

        private typeEntity: TypeEntity,
        private environmentEntity: EnvironmentEntity,
        private locationFaker: LocationFaker,
    ) { }

    public async create() {
        const typePromise = this.typeEntity.filter({ filter: {}, skip: 0, take: 20 });
        const environmentPromise = this.environmentEntity.filter({ filter: {}, skip: 0, take: 20 });
        
        const data = await this.getData();

        const type = await typePromise;
        const environment = await environmentPromise;

        const restaurant = await this.restaurantEntity.create({
            data: {
                ...data,
                environmentReference: { connect:{ id: environment[faker.number.int({ min: 0, max: environment.length-1 })].id } },
                typeReference: { connect:{ id: type[faker.number.int({ min: 0, max: type.length-1 })].id } },
            }
        });
        
        const entitys = await this.menuFaker.create({ count:4, restaurantId:restaurant.id });
        const locations = await this.locationFaker.create({ count:2, restaurantId:restaurant.id })

        return {
            ...data,
            menus: entitys,
            locations
        }            
    }

    private async getData() {
        // Lista de posibles tags para el restaurante
        const possibleTags = [
            'Italian', 'Mexican', 'Japanese', 'Vegetarian', 'Vegan',
            'Fast Food', 'Fine Dining', 'Seafood', 'Steakhouse', 'Cafe',
            'Bar', 'Pub', 'Asian', 'Mediterranean', 'Fusion',
            'Family Friendly', 'Romantic', 'Outdoor Seating', 'Takeout', 'Delivery'
        ];

        return {
            access: faker.string.numeric(7), // Genera una cadena de 7 dígitos
            name: `${faker.company.name()} ${faker.word.noun()}`,
            address: faker.location.streetAddress(),
            phone: faker.phone.number(),
            website: faker.internet.url(),
            horario: `LUN - SAB 8:00am - 10:00pm - DOMINGO 10:00am - 6:00pm`,
            about: faker.lorem.paragraphs({ min: 1, max: 3 }),
            tag: faker.helpers.arrayElements(
                possibleTags,
                faker.number.int({ min: 1, max: 5 })
            )
        };
    }


}


