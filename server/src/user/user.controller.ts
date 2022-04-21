import { Body, Controller, Get, Inject, Param, Post,Query,Req,UseGuards } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from './user.service';
import { RegisterUserResponse } from 'src/interfaces/user';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { userData, userDataForUpdate } from 'src/interfaces/userInterfaces';
import { friendData } from 'src/interfaces/userAddFriend';
import { photo } from 'src/interfaces/photo';

@Controller('user')
export class UserController {
    constructor(
        @Inject(UserService) private userService: UserService,
    ){

    }
    //Rejestracja Użytkownika
    @Post('/register')
    register(
        @Body() newUser: RegisterDto,
    ):Promise<RegisterUserResponse>{
        return this.userService.register(newUser);
    }

    @Post('/setmainphoto')
    @UseGuards(JwtAuthGuard)
    setMainPhoto(
        @Body() photo: photo,
    ):Promise<any>{
        return this.userService.setMainPhoto(photo);
    }

    //Dane użytkownika
    @Get('userdatabyname:username')
    @UseGuards(JwtAuthGuard)
    userDataByName(
        @Param('username') userName:string,
    ):Promise<userData>{
        return this.userService.userDataByName(userName);
    }
    @Get('userdatabyid:userid')
    @UseGuards(JwtAuthGuard)
    userDataById(
        @Param('userid') userId:string,
    ):Promise<userData>{
        return this.userService.userDataById(userId);
    }
    //Odnajdowanie uzytkowników po nazwie
    @Get('findUser')
    @UseGuards(JwtAuthGuard)
    findUser(
        @Query('userId') userId:string,
        @Query('name') name:string,
    ):Promise<userData[]>{
        return this.userService.findUser(userId,name);
    }

    //Aktualizacja danych użytkownika
    @Post('updateSettings')
    @UseGuards(JwtAuthGuard)
    updateUserSettings(
        @Body() req:userDataForUpdate
    ):Promise<any>{
        return this.userService.updateUsersData(req);
    }

    //Dodanie znajomego
    @Post('friends/add')
    @UseGuards(JwtAuthGuard)
    addFriend(
        @Body() req:friendData,
    ):Promise<any>{
        return this.userService.addFriend(req);
    }

    //Usunięcie znajomego
    @Post('friends/add')
    @UseGuards(JwtAuthGuard)
    deleteFriend(
        @Body() req:friendData,
    ):Promise<any>{
        return this.userService.deleteFriend(req);
    }

    //Potwierdzenie znajomego
    @Post('friends/confirm')
    @UseGuards(JwtAuthGuard)
    confirmFriend(
        @Body() req:friendData,
    ):Promise<any>{
        return this.userService.confirmFriend(req);
    }

    //Lista znajomych
    @Get('friends/list')
    @UseGuards(JwtAuthGuard)
    friendsList(
        @Query('userId') userId: string,
    ):Promise<userData[]|any>{
        return this.userService.friendsList(userId);
    }

    @Get('friends/invitings')
    @UseGuards(JwtAuthGuard)
    getInvitings(
        @Query('userId') userId: string,
    ):Promise<userData[]|any>{
        return this.userService.getInvitings(userId);
    }
    
    @Get('friends/active')
    @UseGuards(JwtAuthGuard)
    getActiveFriends(
        @Query('id') id:string,
    ):Promise<userData[]|any>{
        return this.userService.getActiveFriends(id);
    }

    @Get('/setstatus')
    @UseGuards(JwtAuthGuard)
    setStatus(
        @Query('status') status:string,
        @Query('userId') userId:string,
    ):Promise<any>{
        return this.userService.setStatus(status,userId);
    }
}
