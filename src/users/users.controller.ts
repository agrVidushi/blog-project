import {Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {User} from "./entities/user.entity";

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @MessagePattern('createUser')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @MessagePattern('findAllUsers')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  @MessagePattern('findOneUser')
  async findOne(@Param('id') id: number) {
    try {
      const res = await this.usersService.findOne(id);
      return res
    } catch (err) {
      console.error(err)
    }
  }

  @Put(":id")
  @MessagePattern('updateUser')
  update(@Param('id') id: number, @Payload() updateUserDto: User) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  @MessagePattern('removeUser')
  remove(@Param() id: number) {
    return this.usersService.remove(id);
  }

  @Post('token')
  generateToken(@Payload() username: string, @Payload() password: string){
    return this.usersService.generateAuthTokenService(username, password);
  }
}
