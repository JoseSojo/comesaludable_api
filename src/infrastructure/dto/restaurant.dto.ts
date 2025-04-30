import { IsNotEmpty } from 'class-validator';

export default class RestaurantDto {
    
    @IsNotEmpty({message:`Nombre requerido.`})
    name: string;

    @IsNotEmpty({message:`Dirección requerido.`})
    address: string;

    @IsNotEmpty({message:`Teléfono requerido.`})
    phone: string;

    // @IsNotEmpty({message:`Sitio web requerida.`})
    website?: string;

    @IsNotEmpty({message:`Horario requerido.`})
    horario: string;

    @IsNotEmpty({message:`Presentación requerido.`})
    about: string;

    @IsNotEmpty({message:`Tipo de restaurant requerida.`})
    typeId: string

    @IsNotEmpty({message:`Ambiente de restaurant requerido.`})
    environmentId: string

    tag: string[];

}
