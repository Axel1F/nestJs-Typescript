import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) {}

    // создание профиля
    @Post()
    async create(@Body() dto:CreateProfileDto) {
        return this.profileService.createProfile(dto);
    }

    // Получить все профили
    @Get()
    async getAll() {
        return this.profileService.getAllProfiles();
    }

    // Удалить профиль по id пользователя
    @Delete(':userId')
    async delete(@Param('userId') userId: number){
        return this.profileService.deleteProfileByUserId(userId)      
    }

    // Получить профиль по id пользователя
    @Get(':userId')
    async getProfileByUserId(@Param('userId') userId: number) { 
        return this.profileService.getProfileByUserId(userId); 
    }

    // Обновить профиль по id пользователя
    @Put(':userId')
    async update (@Param('userId') userId: number, @Body() dto: UpdateProfileDto){
        return this.profileService.updateProfileByUserId(userId, dto)
    }

}
