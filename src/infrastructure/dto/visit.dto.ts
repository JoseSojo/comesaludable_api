import { IsBoolean, IsEmail, IsNotEmpty } from 'class-validator';

export default class VisitDto {
    
    restaurantId?: string;

    menuId?: string;
}
