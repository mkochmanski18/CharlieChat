import { Body, Controller, Get, Inject, Param, Post,Query,Req,UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/createChat')
  @UseGuards(JwtAuthGuard)
  createChat(
    @Body() newChat: any,
  ):Promise<any>{
    return this.messageService.createChat(newChat);
  }

  @Get('/userRooms')
  @UseGuards(JwtAuthGuard)
  userRooms(
    @Query('id') id:string,
  ):Promise<any>{
    return this.messageService.userRooms(id);
  }

  @Get('/roomInfo')
  @UseGuards(JwtAuthGuard)
  roomInfo(
    @Query('name') name:string,
  ):Promise<any>{
    return this.messageService.roomInfo(name);
  }

  //Wiadomości

  //Wysłanie wiadomości
  @Post('/send/common')
  @UseGuards(JwtAuthGuard)
  sendCommon(
    @Body()req:any,
  ):Promise<any>{
    return this.messageService.sendCommon(req);
  }
  //Szukanie konwersacji
  @Get("/get/common")
  @UseGuards(JwtAuthGuard)
  getCommon(
    @Query('userId') userId:string,
    @Query('destination') destination: string,
  ):Promise<any>{
    return this.messageService.getCommon(userId,destination);
  }

  //Lista ostatnich chatów/rozmów
  @Get("/get/lastChats")
  //@UseGuards(JwtAuthGuard)
  getLastChats(
    @Query('userId') userId:string
  ):Promise<any>{
    return this.messageService.getLastChats(userId);
  }
}
