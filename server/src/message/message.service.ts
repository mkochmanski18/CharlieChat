import { Inject, Injectable } from '@nestjs/common';
import { groupBy } from 'rxjs';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { getRepository } from 'typeorm';
import { Chat } from './chat.entity';
import { Message } from './message.entity';

@Injectable()
export class MessageService {

    async createChat(newChat:any):Promise<any>{
        const isChatExist = await Chat.findOne({
            name:newChat.name
        })
        if(isChatExist) return {error:"Name of chat is already used!"}
        else{
            const chat = new Chat();
            const user = await getRepository(User)
            .createQueryBuilder("user")
            .where("userid = :id",{id:newChat.userId})
            .getOne()
            chat.name = newChat.name;
            chat.owner = user;
            chat.save();
            
            console.log("Chat o nazwie:",newChat.name,", został utworzony")
        }
    }

    async userRooms(id:string):Promise<any>{
            console.log("User\n")
        const chats = await getRepository(Chat)
        .createQueryBuilder("chat")
        .leftJoinAndSelect("chat.participants","participant")
        .where("chat.owner = :user",{user:id})
        .orWhere("participant.userid = :id",{id:id})
        .groupBy("chat.name")
        .getRawMany()

        let list = []
        chats.map(chat=>{
            list.push(chat.chat_name)
        })
        
        return list
    }

    async roomInfo(name:string):Promise<any>{
        console.log("Chat\n")
    const chat = await getRepository(Chat)
    .createQueryBuilder("chat")
    .leftJoinAndSelect("chat.participants","participant")
    .where("chat.name = :name",{name:name})
    .getRawMany()

    let list = []
    chat.map(data=>{
        const {chat_name,participant_name,participant_email,participant_status} = data;
        const chatData = {
            chat_name: chat_name,
            name: participant_name,
            email: participant_email,
            status: participant_status
        }
        list.push(chatData);
    })
    
    return list
}

//Wiadomości
    async sendCommon(req:any):Promise<any>{
        const message = new Message();
        
        message.sender = req.userId;
        const destination = await getRepository(User)
        .createQueryBuilder("user")
        .where("user.name = :name",{name:req.destination})
        .getOne()
        message.destination = destination;
        const date = new Date();
        message.datetime = date;

        message.text = req.text;

        message.save();
    }
    async getCommon(userId:string,destination:string):Promise<any>{

        const messages = await getRepository(Message)
        .createQueryBuilder('message')
        .where("message.sender = :id AND message.destination = :destination",{id:userId,destination:destination})
        .orWhere("message.sender =:destination AND message.destination=:id",{id:destination,destination:userId})
        .orderBy("message.datetime")
        .getRawMany();

        let list=[];
        let lastsender = null;
        messages.forEach(message=>{
            const {message_messageId,message_datetime,message_text,message_senderUserid} = message;
            
            const newElement = {
                id: message_messageId,
                datetime: message_datetime,
                text: message_text,
                sender: message_senderUserid === userId ? "Ty" : destination,
                lastsender
            }
            lastsender = message_senderUserid === userId ? "Ty" : destination;
            list.push(newElement);
        })
        return list;
    }

    async getLastChats(userId:string):Promise<any>{

        const sendedMessages = await getRepository(Message)
        .createQueryBuilder('message')
        .where("message.sender = :id or message.destination=:id",{id:userId})
        .groupBy("message.destination")
        .groupBy("message.sender")
        .orderBy("message.datetime")
        .getRawMany();
        let messages=[];
        sendedMessages.forEach(sendedMessages=>{
            const {message_messageId,message_datetime,message_text,message_destinationUserid,message_senderUserid} = sendedMessages;
            const newElement = {
                id: message_messageId,
                datetime: message_datetime,
                text: message_text,
                person: message_destinationUserid !== userId ? message_destinationUserid : message_senderUserid
            }
            messages.push(newElement);
        })
        console.log(messages)
        return messages;
    }
}
