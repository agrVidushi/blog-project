import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";

@Entity('blogs')
export class Blog {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public content: string;

    @Column()
    public title: string;

    @Column({nullable: true})
    public likes: number;

    @Column('jsonb', {nullable: true, default: {}})
    public comments: object;

    @ManyToOne(type => User, user => user.blog)
    public user: User[];
}
