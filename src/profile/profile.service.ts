import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.model';


@Injectable()
export class ProfileService {

    constructor(@InjectModel(Profile) private roleRepository: typeof Profile) {}

    // функция создание профиля
    async createProfile(dto: CreateProfileDto) {
        const profile = await this.roleRepository.create(dto);
        return profile;
    }

}