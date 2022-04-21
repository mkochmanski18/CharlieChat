import { type } from "os";
import { BaseEntity, Column, Entity,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";
import { Message } from "./message.entity";

@Entity()
export class Chat extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    chatId: string;

    @Column()
    name: string;

    @ManyToOne(()=>User,user=>user.chats)
    owner: User;

    @ManyToMany(()=>User,user=>user.chat)
    participants : User;

    @OneToMany(()=>Message,message=>message.chat)
    messages: Message;
}