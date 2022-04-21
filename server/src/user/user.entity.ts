import { type } from "os";
import { Chat } from "src/message/chat.entity";
import { Message } from "src/message/message.entity";
import { BaseEntity, Column, Entity,JoinColumn,JoinTable,ManyToMany,OneToMany,PrimaryGeneratedColumn } from "typeorm";
import { Friend } from "./friend.entity";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    userid: string;

    @Column({
        length: 25,
    })
    name: string;

    @Column({
        length: 6,
    })
    sex: string;

    @Column({
        length: 25,
    })
    email: string;

    @Column({
        default: false,
    })
    status: boolean;

    @Column()
    pwdHash: string;

    @Column({
        nullable:true,
        default: 1,
    })
    role:number|null;

    @Column()
    photo: ImageBitmap|null;

    @Column({
        nullable:true,
        default: null,
    })
    currentTokenId:string|null;

    @OneToMany(()=>Friend,friend=>friend.user)
    users: Friend[];
    
    @OneToMany(()=>Friend,friend=>friend.friend)
    friends: Friend[];

    @OneToMany(()=>Message,message=>message.sender)
    sends: Message[];

    @OneToMany(()=>Message,message=>message.destination)
    messages: Message[];

    @OneToMany(()=>Chat,chat=>chat.owner)
    chats: Message[];

    @ManyToMany(()=>Chat,chat=>chat.participants)
    @JoinTable()
    chat : Chat;
}