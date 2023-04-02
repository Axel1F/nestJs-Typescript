import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) {}

    @Post()
    create(@Body() dto: CreateProfileDto) {
        return this.profileService.createProfile(dto);
    }

}
