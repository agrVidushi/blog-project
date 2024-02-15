import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {User} from "./entities/user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
    global: true,
    signOptions: { expiresIn: '654430s' },
  })],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
