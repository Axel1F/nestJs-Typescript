import { Injectable } from '@nestjs/common';
import { FilesService } from 'src/files/files.service';
import { CreateTextBlockDto } from './dto/create-text-block.dto';
import { TextBlock } from './text-block.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TextBlockService {
    

    constructor(@InjectModel(TextBlock) private TextBlockRepository: typeof TextBlock,
                private fileService: FilesService) {}
                
    // создание постов
    async create(dto: CreateTextBlockDto, image: any) {

        // сохранение в базу данных
        const fileName = await this.fileService.createFile(image);

        // 
        const TextBlock = await this.TextBlockRepository.create({...dto, image: fileName})
        return TextBlock;
    }
}
