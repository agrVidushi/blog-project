import {Injectable, UnprocessableEntityException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import {QueryDeepPartialEntity} from "typeorm/query-builder/QueryPartialEntity";
import {InjectRepository} from "@nestjs/typeorm";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
              private jwtService: JwtService) {
  }
  create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.save(createUserDto);
    if (!newUser)
      throw new UnprocessableEntityException('Cant create user');
    return newUser;
  }

  findAll() {
    const allUsers = this.userRepository.find({});
    if (!allUsers)
      throw new UnprocessableEntityException('Cant fetch users');
    return allUsers;
  }

  async findOne(id: number) {
    const  x = +id
    try {
      const user = await this.userRepository.findOneBy({id: id});
      if (!user)
        throw new UnprocessableEntityException(`User does not exists with the id ${id}`);
      return user;
    } catch (err) {
    console.error(err)}
  }

  update(id: number, updateUserDto: Partial<User>) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  async generateAuthTokenService(username: string, password: string){
    const payload = { username: username, password: password };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
