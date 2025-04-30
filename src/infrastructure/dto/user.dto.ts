import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {

    @IsNotEmpty({ message: `Correo requerido.` })
    @IsEmail({}, { message: `Correo no válido.` })
    email: string;

    @IsNotEmpty({ message: `Nombre requerido.` })
    name: string;

    @IsNotEmpty({ message: `Apellido requerido.` })
    lastname: string;

    @IsNotEmpty({ message: `Edad requerido.` })
    age: string;

    @IsNotEmpty({ message: `Contraseña requerida.` })
    password: string;

    @IsBoolean()
    acceptEmail: boolean;

}

export class UserLoggingDto {
    @IsNotEmpty({ message: `Correo requerido.` })
    @IsEmail({}, { message: `Correo no válido.` })
    email: string;

    @IsNotEmpty({ message: `Contraseña requerida.` })
    password: string;
}

export class UserAdministrationLoggingDto {
    @IsString({ message: `Datos incorrectos.` })
    username: string;

    @IsString({ message: `Datos incorrectos.` })
    password: string;
}

export class UserRestaurnatLoggingDto {
    @IsNotEmpty({ message: `Código de accesso requerido.` })
    code: string;
}

export class UserRegisterDto extends UserLoggingDto {

    @IsNotEmpty({ message: `Correo requerido.` })
    @IsEmail({}, { message: `Correo no válido.` })
    email: string;

    @IsNotEmpty({ message: `Nombre requerido.` })
    name: string;

    @IsNotEmpty({ message: `Apellido requerido.` })
    lastname: string;

    @IsNotEmpty({ message: `Contraseña requerida.` })
    password: string;

    @IsString()
    acceptEmail: string;

    @IsNotEmpty({ message: `Edad requerida.` })
    age: string

}



export class UserUpdateDto {

    @IsEmail({}, { message: `Correo no válido.` })
    email?: string;

    name?: string;

    lastname?: string;

    password?: string;

    acceptEmail?: string;

    age?: string

}

export class UserUpdatePasswordDto {

    oldPassword: string;

    password: string;
    repeatPassword: string;
}
