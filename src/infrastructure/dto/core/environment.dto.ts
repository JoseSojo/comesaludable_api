import { IsNotEmpty } from "class-validator";

export default class EnvirontmentDto {
    
    @IsNotEmpty({ message:`Nombre requerido.` })
    name: string

}
