import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Post } from "src/posts/posts.model";
import { Profile } from "src/profile/profile.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

// атрибуты для создания
interface UserCreationAttrs{
    email:string;
    password: string;
}


// создание таблицы Пользователи
@Table({tableName:'users'})
export class User extends Model<User >{

    @ApiProperty({example:'1', description:'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    
    @ApiProperty({example:'user@mail.ru', description:'Почтовый адрес'})
    @Column({type: DataType.STRING, unique: true, allowNull:false})
    email: string;

    @ApiProperty({example:'123546', description:'Пароль'})
    @Column({type: DataType.STRING, allowNull:false})
    password: string;

    @ApiProperty({example:'true', description:'Забанен пользователь или нет'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned:boolean;

    @ApiProperty({example:'За хулигантство', description:'Причина блокировки'})
    @Column({type: DataType.STRING, allowNull:true})
    banReason: string;

    // Связь между таблицам многие ко многим
    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    // Связь между таблицам один ко многим
    @HasMany(() => Post)
    posts: Post[];

    



}