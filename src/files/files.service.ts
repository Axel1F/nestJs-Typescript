import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from 'path'

// модуль для работы с файлами
import * as fs from 'fs';

// модуль для рандомныех названий файлов
import * as uuid from 'uuid';

@Injectable()
export class FilesService {

    // создание файла
    async createFile(file): Promise<string> {
        try {

            // генерация уникального названия файла
            const fileName = uuid.v4() + '.jpg';

            // получение пути к файлу
            const filePath = path.resolve(__dirname, '..', 'static')


            if (!fs.existsSync(filePath)) {

                // создание папки если ее не существует
                fs.mkdirSync(filePath, {recursive: true})
            }

            // запись файла в папку
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return fileName;
        } catch (e) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
