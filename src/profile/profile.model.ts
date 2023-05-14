import {HasOne, Column, DataType, HasAssociation, Model, Table, BelongsTo, ForeignKey} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";


// атрибуты для создания
interface ProfileCreationAttrs {
    surname: string;
    name: string;
    telephone: number;
    userId: number;
}

// создание таблицы Профиль
@Table({tableName: 'profile'})
export class Profile extends Model<Profile, ProfileCreationAttrs> {

    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Иванов', description: 'Фамилия'})
    @Column({type: DataType.STRING, allowNull: false})
    surname: string;

    @ApiProperty({example: 'Иван', description: 'Имя'})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ApiProperty({example: '222222', description: 'Телефон'})
    @Column({type: DataType.NUMBER, allowNull: false})
    telephone: number;

    // внешний ключ
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    // Связь между таблицам один к одному
    @BelongsTo(() => User)
    users: User[];
}
