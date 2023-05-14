import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTextBlockDto } from './dto/create-text-block.dto';
import { UpdateTextBlockDto } from './dto/update-text-block.dto';
import { TextBlock } from './text-block.model';



@Injectable()
export class TextBlockService {
    constructor(@InjectModel(TextBlock) private textBlockRepository: typeof TextBlock ){}

    // функция создание текстового блока
    async createTextBlock(dto: CreateTextBlockDto) {
        const textBlock = await this.textBlockRepository.create(dto);
        return textBlock;
    }

    // функция все текстовые блоки/фильтрация по группе
    async getTextBlock(filter) {
        if (!filter.group) { 
            const textBlocks = await this.textBlockRepository.findAll();
            return textBlocks
        }
        else {
            const textBlocks = await this.textBlockRepository.findAll({
                where: {
                    group: filter.group}});
            return textBlocks
        }
        
    }

    // Удалить текстовый блок по id 
    async deleteTextBlockById(Id: number){
        const textBlock = await this.textBlockRepository.destroy({
            where: {
                id: Id
            }
          });
        return "delete Text Block " + textBlock;      
    }
 
    // Получить текстовый блок по id 
    async getTextBlockById(Id: number){
        const textBlock = await this.textBlockRepository.findOne({
            where: {
                id: Id
            }
          });
        return textBlock;
    } 

 
    // Обновить текстовый блок по id 
    async updatePTextBlockById (Id: number, dto: UpdateTextBlockDto, ){
        const textBlock = await this.textBlockRepository.update({...dto}, {
            where: {
                id: Id
            }
        });     
        return "Update Text Block " + textBlock;      
    }
}
