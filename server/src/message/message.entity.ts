import { type } from "os";
import { BaseEntity, Column, Entity,ManyToOne,PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";
import { Chat } from "./chat.entity";

@Entity()
export class Message extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    messageId: string;

    @Column()
    datetime: Date;

    @Column()
    text:string;

    @ManyToOne(()=>User,user=>user.sends)
    sender: User;

    @ManyToOne(()=>User,user=>user.messages)
    destination: User;

    @ManyToOne(()=>Chat,chat=>chat.messages)
    chat:Chat;
}