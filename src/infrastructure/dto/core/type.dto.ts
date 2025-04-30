import { IsNotEmpty } from "class-validator";

export default class TypeDto {
    
    @IsNotEmpty({ message:`Nombre requerido.` })
    name: string

}
