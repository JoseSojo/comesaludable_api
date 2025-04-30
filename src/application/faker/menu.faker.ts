import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import CategoryEntity from "src/infrastructure/entity/core/category.entity";
import TypeEntity from "src/infrastructure/entity/core/type.entity";
import MenusEntity from "src/infrastructure/entity/menus.entity";
import MenusRepository from "src/infrastructure/repositories/menus.repository";

@Injectable()
export default class MenuFaker {
    
    constructor(
        private menuEntity: MenusEntity,
        private menuRepository: MenusRepository,

        private categoryEntity: CategoryEntity,
        private typeEntity: TypeEntity,
    ) {}

    public async create ({count,restaurantId}: {count: number, restaurantId: string}) {

        const categoryPromise = this.categoryEntity.filter({ filter:{  }, skip: 0, take: 20 });
        console.log(await categoryPromise);
        const typePromise = this.typeEntity.filter({ filter:{  }, skip: 0, take: 20 });

        const category = await categoryPromise;
        const type = await typePromise;

        const result = [];

        for (let i = 0; i < count; i++) {
            console.log(category.length-1, type.length-1)
            const entity = await this.cutomCreate(
                category[faker.number.int({ min: 0, max: category.length-1 })].id, 
                type[faker.number.int({ min: 0, max: type.length-1 })].id, 
                restaurantId
            );
            result.push(entity);
        }
        
        return result;
    }

    private async cutomCreate (categoryId:string, typeId: string, restaurantId: string) {
        const data = await this.getData();

        // const customCategory = category[faker.number.int({ min: 0, max: category.length-1 })];

        // const customType = type[faker.number.int({ min: 0, max: type.length-1 })]

        const entity = this.menuEntity.create({
            data: {
                ...data,
                categoryReference: { connect:{id:categoryId} },
                typeReference: { connect:{id:typeId} },
                restauranteReference: { connect:{ id:restaurantId } }
            }
        });

        return entity;
    }

    private async getData() {
        // Listas de posibles valores para arrays
        const possibleAllergens = [
            'Gluten', 'Crustaceans', 'Eggs', 'Fish', 'Peanuts', 
            'Soybeans', 'Milk', 'Nuts', 'Celery', 'Mustard', 
            'Sesame', 'Sulphites', 'Lupin', 'Molluscs'
        ];

        const possibleIngredients = [
            'Tomato', 'Cheese', 'Flour', 'Egg', 'Chicken',
            'Beef', 'Pork', 'Rice', 'Pasta', 'Potato',
            'Onion', 'Garlic', 'Olive oil', 'Butter', 'Mushrooms',
            'Bell pepper', 'Carrot', 'Broccoli', 'Spinach', 'Salmon'
        ];

        const possibleTags = [
            'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 
            'Spicy', 'Low-Carb', 'Keto', 'Paleo', 'Quick Meal',
            'Gourmet', 'Comfort Food', 'Healthy', 'Seasonal'
        ];

        return {
            name: faker.commerce.productName() + ' ' + faker.word.adjective(),
            price: parseFloat(faker.commerce.price({ min: 5, max: 50 })),
            about: faker.lorem.paragraph(),
            allergens: faker.helpers.arrayElements(
                possibleAllergens, 
                faker.number.int({ min: 0, max: 3 })
            ),
            ingredients: faker.helpers.arrayElements(
                possibleIngredients,
                faker.number.int({ min: 3, max: 8 })
            ),
            forPeople: faker.number.int({ min: 1, max: 4 }),
            preparation: faker.lorem.paragraphs({ min: 1, max: 3 }),
            tags: faker.helpers.arrayElements(
                possibleTags,
                faker.number.int({ min: 1, max: 4 })
            )
        };
    }

}
