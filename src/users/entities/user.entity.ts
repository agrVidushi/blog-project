import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Blog} from "../../blogs/entities/blog.entity";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public gender: string;

    @CreateDateColumn()
    public created_at: Date;

    @OneToMany(type => Blog, blog => blog.user)
    public blog: Blog[];
}
