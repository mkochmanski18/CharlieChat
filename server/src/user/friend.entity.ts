import { type } from "os";
import { BaseEntity, Column, Entity,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Friend extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    relationId: string;

    @Column()
    confirmed: boolean;

    @ManyToOne(()=>User,user=>user.users)
    user: User;

    @ManyToOne(()=>User,user=>user.friends)
    friend: User;
}