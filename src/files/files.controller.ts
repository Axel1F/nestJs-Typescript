import { Controller, Delete, Param } from '@nestjs/common';
import { ProfileService } from 'src/profile/profile.service';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
    constructor(private fileService: FilesService) {}

    // Удалить текстовый блок по id 
    @Delete(':Id')
    async delete(@Param('Id') Id: number){
        return this.fileService.deleteAllUnnecessaryFiles()     
    }

}
