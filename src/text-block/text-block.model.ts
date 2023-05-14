import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import { Files } from "src/files/files.model";
import {ApiProperty} from "@nestjs/swagger";

// атрибуты для создания
interface TextBlockCreationAttrs {
    uniqueName: string;
    title: string;
    content: string;
    group: string;
    fileId: number;
}

// создание таблицы  Текстовый блок
@Table({tableName: 'text-block'})
export class TextBlock extends Model<TextBlock, TextBlockCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    uniqueName: string;

    @Column({type: DataType.STRING})
    title: string;

    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @Column({type: DataType.STRING, allowNull: false})
    group: string;

    // внешний ключ
    @ForeignKey(() => Files)
    @Column({type: DataType.INTEGER})
    fileId: number;

}
