import {IsNumber, IsString} from "class-validator";

export class AddRoleDto {

    // проверка на строковое знаяение
    @IsString({message: "Должно быть строкой"})
    readonly value: string;

    // проверка на числовое знаяение
    @IsNumber({}, {message: "Должно быть числом"})
    readonly userId: number;
}
