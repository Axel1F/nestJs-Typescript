import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { BelongsToMany,Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRoles } from "./user-roles.model";

// атрибуты для создания
interface RoleCreationAttrs{
    value:string;
    description: string;
}

// создание таблицы Роли
@Table({tableName:'roles'})
export class Role extends Model<Role >{

    @ApiProperty({example:'1', description:'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    
    @ApiProperty({example:'ADMIN', description:'Уникальное значение роли пользователя'})
    @Column({type: DataType.STRING, unique: true, allowNull:false})
    value: string;

    @ApiProperty({example:'Администратор', description:'Описание роли'})
    @Column({type: DataType.STRING, allowNull:false})
    description: string;

    // Связь между таблицам многие ко многим
    @BelongsToMany(() => User, () => UserRoles)
    users: User[];
 
}