import { IsBoolean, IsEmail, IsNotEmpty } from 'class-validator';

export default class CommentDto {
    
    restaurantId?: string;

    menuId?: string;

    @IsNotEmpty({ message: `Estrellas requeridas` })
    stars: number;

    @IsNotEmpty({ message: `Comentario requeridas` })
    comment: string;

}
