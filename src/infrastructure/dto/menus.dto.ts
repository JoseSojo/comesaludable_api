import { IsNotEmpty } from 'class-validator';

export default class MenusDto {

    @IsNotEmpty({ message: `Restaurant requerido.` })
    restaurantId: string;

    @IsNotEmpty({ message: `Categoría requerido.` })
    categoryId: string;

    @IsNotEmpty({ message: `Tipo requerido.` })
    typeId: string;

    @IsNotEmpty({ message: `Nombre requerido.` })
    name: string;
    
    @IsNotEmpty({ message: `Descripción requerido.` })
    about: string;

    @IsNotEmpty({ message: `Tiempo preparación requerido.` })
    preparation: string;

    @IsNotEmpty({ message: `Cantidad personas requerido.` })
    forPeople: number;       

    @IsNotEmpty({ message: `Costo requerido.` })
    price: number;                   

    @IsNotEmpty({ message: `Etiquetas requerido.` })
    tags: string[];
    
    @IsNotEmpty({ message: `Ingredientes requerido.` })
    ingredients: string[];

    @IsNotEmpty({ message: `Alergenos requerido.` })
    allergens: string[];


}
