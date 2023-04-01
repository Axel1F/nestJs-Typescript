import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import {User} from "../users/users.model";

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService) {}

    
    // функция авторизация
    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    // функция регистрация
    async registration(userDto: CreateUserDto) {

        // проверка есть ли пользователь с таким email в базе данных
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if (candidate) {
            
            // ошибка
            throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST);
        }

        // хэширование пароля
        const hashPassword = await bcrypt.hash(userDto.password, 5);

        // создание пользователя с хэшированным паролем
        const user = await this.userService.createUser({...userDto, password: hashPassword})
        
        // возваращает сгенерированный токен
        return this.generateToken(user)
    }

    // функция генерация токена
    private async generateToken(user: User) {

        // информация внутри токена
        const payload = {email: user.email, id: user.id, roles: user.roles}
        return {

            // генерация токена через JWt сервис
            token: this.jwtService.sign(payload)
        }
    }

    // валидация пользователя, функция используется тольк внутри сервиса
    private async validateUser(userDto: CreateUserDto) {

        // получение пользователя по email
        const user = await this.userService.getUserByEmail(userDto.email);

        // проверка пароля введенного пользователем и в базе данных
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: 'Некорректный емайл или пароль'})
    }
}
