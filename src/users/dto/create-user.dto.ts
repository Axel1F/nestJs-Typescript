import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {

    @ApiProperty({example: 'user@mail.ru', description: 'Почта'})

    // проверка на строковое знаяение
    @IsString({message: 'Должно быть строкой'})

    // проверка на email
    @IsEmail({}, {message: "Некорректный email"})
    readonly email: string;
    @ApiProperty({example: '12345', description: 'пароль'})
    @IsString({message: 'Должно быть строкой'})

    // проверка на длину
    @Length(4, 16, {message: 'Не меньше 4 и не больше 16'})
    readonly password: string;
}