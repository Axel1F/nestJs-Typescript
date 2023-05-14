import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './profile.model';


@Injectable()
export class ProfileService {

    constructor(@InjectModel(Profile) private profileRepository: typeof Profile) {}

    // функция создание профиля
    async createProfile(dto: CreateProfileDto) {
        const profile = await this.profileRepository.create(dto);
        return profile;
    }

    // функция все профили
    async getAllProfiles() {
        const profiles = await this.profileRepository.findAll();
        return profiles;
    }

    // Удалить профиль по id пользователя
    async deleteProfileByUserId(userId: number){
        const profile = await this.profileRepository.destroy({
            where: {
                userId: userId
            }
          });
        return "delete" + profile;      
    }
 
    // Получить профиль по id пользователя
    async getProfileByUserId(userId: number){
        const profile = await this.profileRepository.findOne({
            where: {
                userId: userId
            }
          });
        return profile;
    } 
 
    // Обновить профиль по id пользователя
    async updateProfileByUserId (userId: number, dto: UpdateProfileDto, ){
        const profile = await this.profileRepository.update({...dto}, {
            where: {
                userId: userId
            }
        });     
        return "Update" + profile;      
    }
    
 

}
