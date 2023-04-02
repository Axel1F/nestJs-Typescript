import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {User} from "../users/users.model";

// атрибуты для создания
interface TextBlockCreationAttrs {
    title: string;
    content: string;
    userId: number;

    // название изображения
    image: string;
}

// создание таблицы Посты
@Table({tableName: 'text-block'})
export class TextBlock extends Model<TextBlock, TextBlockCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    @Column({type: DataType.STRING})
    image: string;

    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    // внешний ключ
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    // Связь между таблицам один ко многим
    @BelongsTo(() => User)
    author: User

}
