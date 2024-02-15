import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Blog} from "./entities/blog.entity";
import {Repository} from "typeorm";

@Injectable()
export class BlogsService {

  constructor(@InjectRepository(Blog) private readonly blogRepository: Repository<Blog>) {
  }
  create(createBlogDto: CreateBlogDto) {
    return this.blogRepository.save(createBlogDto);
  }

  findAll() {
    return this.blogRepository.find({});
  }

  findOne(id: number) {
    return this.blogRepository.findOneBy({id: id});
  }

  async update(id: number, updateBlogDto: Partial<Blog>) {
    if (updateBlogDto.likes){
      const blog = await this.blogRepository.findOneBy({id: id});
      let likes = blog.likes + 1;
      updateBlogDto.likes = likes;
    }
    return this.blogRepository.update(id, updateBlogDto);
  }

  remove(id: number) {
    return this.blogRepository.delete(id);
  }
}
