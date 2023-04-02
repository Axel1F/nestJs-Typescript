import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { TextBlockService } from './text-block.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateTextBlockDto } from './dto/create-text-block.dto';

@Controller('text-block')
export class TextBlockController {
    constructor(private TextBlockService: TextBlockService) {}

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() dto: CreateTextBlockDto,
    
    // пакет для работы с файлами
               @UploadedFile() image) {
        return this.TextBlockService.create(dto, image)
    }

}

