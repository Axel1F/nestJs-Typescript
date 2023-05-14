import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {
    }

    // запрещен или разрешен доступ по авторизации
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const authHeader = req.headers.authorization;

            // тип токена
            const bearer = authHeader.split(' ')[0]

            // значение токена
            const token = authHeader.split(' ')[1]

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'Пользователь не авторизован'})
            }

            // раскодировка пользователя
            const user = this.jwtService.verify(token);
            req.user = user;
            return true;
        } catch (e) {
            throw new UnauthorizedException({message: 'Пользователь не авторизован'})
        }
    }

}