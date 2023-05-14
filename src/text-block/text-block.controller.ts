import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { query } from 'express';
import { CreateTextBlockDto } from './dto/create-text-block.dto';
import { GetTextBlockFilterDto } from './dto/get-text-block-filter.dto';
import { UpdateTextBlockDto } from './dto/update-text-block.dto';
import { TextBlock } from './text-block.model';
import { TextBlockService} from './text-block.service';

@Controller('text-block')
export class TextBlockController {
    constructor(private TextBlockService: TextBlockService) {}

    // создание текстового блока
    @Post()
    async create(@Body() dto:CreateTextBlockDto) {
        return this.TextBlockService.createTextBlock(dto);
    }

    // Получить все текстовые блоки/фильтрация по группе блока
    @Get()
    async get(@Query() filter: GetTextBlockFilterDto){
        return this.TextBlockService.getTextBlock(filter);
    }

    // Удалить текстовый блок по id 
    @Delete(':Id')
    async delete(@Param('Id') Id: number){
        return this.TextBlockService.deleteTextBlockById(Id)      
    }

    // Получить текстовый блок по id 
    @Get(':Id')
    async getTextBlockById(@Param('Id') Id: number) { 
        return this.TextBlockService.getTextBlockById(Id); 
    }


    // Обновить текстовый блок по id 
    @Put(':Id')
    async update (@Param('Id') Id: number, @Body() dto: UpdateTextBlockDto){
        return this.TextBlockService.updatePTextBlockById(Id, dto)
    }

}
