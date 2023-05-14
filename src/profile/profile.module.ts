import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import { Profile } from './profile.model';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';

@Module({
  providers: [ProfileService],
  controllers: [ProfileController],
  imports: [
    SequelizeModule.forFeature([User, Profile])
  ],
  exports: [
    ProfileService
  ]
})
export class ProfileModule {}