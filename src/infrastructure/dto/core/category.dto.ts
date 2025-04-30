import { IsNotEmpty } from "class-validator";

export default class CategoryDto {
    
    @IsNotEmpty({ message:`Nombre requerido.` })
    name: string

}
