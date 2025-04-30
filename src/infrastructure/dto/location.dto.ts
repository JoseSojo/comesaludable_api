import { IsNotEmpty } from 'class-validator';

export default class LocationDto {
    
    @IsNotEmpty({ message: `Ubicación requerida` })
    location: any;

}
