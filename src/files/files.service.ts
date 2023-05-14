import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from 'path'
import * as fs from 'fs';
import * as uuid from 'uuid';
import { InjectModel } from '@nestjs/sequelize';
import { Files } from './files.model';
import { Op } from 'sequelize';

@Injectable()
export class FilesService {

    constructor(@InjectModel(Files) private fileRepresitory: typeof Files ){}

    // создание файла
    async createFile(file): Promise<string> {
        try {
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve(__dirname, '..', 'static')

            // создание папки если ее нет
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            // запись файла
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return fileName;
        } catch (e) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    // удаление неиспользуемых файлов
    async deleteAllUnnecessaryFiles() {
        const deletedFiles = await this.fileRepresitory.destroy({
            where: {
                // оператор или
                [Op.or]: [{essenceTable: null}, {essenceId: null}]}
            });
            
            console.log(`Неиспользуемые файлы удалены`);
    }
    
}