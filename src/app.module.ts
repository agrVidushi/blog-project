import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { join } from 'path';
import { BlogsModule } from './blogs/blogs.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot({
    // "driver": "pg",
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "vidu1234",
    "database": "postgres",
    "entities": [join(__dirname, '**', '*.entity.{ts,js}')],
    "synchronize": true}), BlogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
