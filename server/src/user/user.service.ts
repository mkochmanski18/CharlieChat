import { Injectable } from '@nestjs/common';
import { hashPwd } from 'src/utils/hash-pwd';
import { User } from './user.entity';
import { RegisterDto } from './dto/register.dto';
import { RegisterUserResponse } from 'src/interfaces/user';
import { userData, userDataForUpdate } from 'src/interfaces/userInterfaces';
import { friendData } from 'src/interfaces/userAddFriend';
import { Friend } from './friend.entity';
import {getRepository} from "typeorm";
import { photo } from 'src/interfaces/photo';

@Injectable()
export class UserService {

    regFilter(user:User):RegisterUserResponse{
        const {userid, name, sex, email} = user;
        return {userid,name,sex,email};
    }
    userDataFilter(user:User):userData{
      const {userid, name,email, sex,status} = user;
      return {userid,name,email,sex,status};
  }
    async register(newUser:RegisterDto):Promise<RegisterUserResponse|any>{
        
        
            const checkemail = await User.findOne({
              email:newUser.email,
            });
            const checkname = await User.findOne({
              name:newUser.name,
            });
            if(checkemail){
              return {error:"User already exists!",code:407};
            }
            else if(checkname){
              return {error:"User name is taken!",code:408};
            }
            else{
                const user = new User();
                user.email = newUser.email;
                user.name = newUser.name;
                user.sex = newUser.sex;
                user.pwdHash = hashPwd(newUser.pwd);
                
                await user.save();
                console.log("Registered!");

                return this.regFilter(user);
            }
          }

        async setMainPhoto(photo:photo):Promise<any>{
          const user = await User.findOne({
            userid: photo.id
          })
          if(user) {
            user.photo = photo.src;
            user.save();
            return {success:"Photo has been updated!"};
          }
          else return {error:"Cannot update your photo!"}
          
        }
        async userDataById(userId:string):Promise<userData|any>{
          
        try{
          const user = await User.findOne({
            userid:userId
        });
        return this.userDataFilter(user);
        } 
        catch(error){
          console.error(`${error.name} - ${error.message}`)
        } 
        }  
        
        async userDataByName(userName:string):Promise<userData|any>{
          try{
          const user = await User.findOne({
            name:userName
          })
          return this.userDataFilter(user);
        }
        catch(error){
          console.error(`${error.name} - ${error.message}`)
        }
        }
        async updateUsersData(req:userDataForUpdate):Promise<any>{
          const user = await User.findOne({
            userid: req.userid,
          });
          if(user) {
            user.name = req.name;
            user.sex = req.sex;
            user.email = req.email;

            user.save();
            return {success:"ok"};
          }
          else return {error:"Cannot update your settings!"}
        }

        async addFriend(req:friendData):Promise<any>{
          try{
          const friend = new Friend();
          const currentUser = await User.findOne({
            userid: req.userid,
          });
          const friendUser = await User.findOne({
            name:req.friendname
          });
          friend.user = currentUser;
          friend.friend = friendUser;
          friend.confirmed = false;

          await friend.save();

          return {ok:'success'}
        }
        catch(error){
          console.error(`${error.name} - ${error.message}`);
        }
        }

        async deleteFriend(req:friendData):Promise<any>{
          try{
          const currentUser = await User.findOne({
            userid: req.userid,
          });
          const friendUser = await User.findOne({
            userid:req.friendname
          });
          const friend = await Friend.findOne({
            user: currentUser,
            friend: friendUser
          })

          friend.remove();
          return {ok:'success'}
        }
        catch(error)
        {console.error(`${error.name} - ${error.message}`)}
        }

        async findUser(userId:string, name:string):Promise<userData[]>{

          const users = await getRepository(User)
          .createQueryBuilder("user")
          .leftJoinAndSelect("user.friends","friend")
          .where("user.name like :name AND user.userid != :id",{name:`%${name}%`,id:userId})
          .orderBy({
            "friend.confirmed":"DESC",
            "user.name": "ASC"
          })
          .getRawMany();
          let list = [];
          users.map(user=>{
            const {user_userid,user_name, user_sex, user_email, friend_confirmed} = user;
            const friendData = {
              userid: user_userid,
              name: user_name,
              sex: user_sex, 
              email: user_email,
              confirmed: friend_confirmed,
            }
            list.push(friendData);
          });
          return list;
        }

        async friendsList(userId: string) :Promise<userData[]|any>{

          try{
          const friends = await getRepository(User)
          .createQueryBuilder("user")
          .leftJoin("user.friends","friend")
          .where("friend.confirmed=:confirmed AND friend.friendUserid=:id",{confirmed:1,id:userId})
          .orWhere("friend.confirmed=:confirmed AND friend.userUserid=:id",{confirmed:1,id:userId})
          .orderBy({
            "user.name": "ASC",
            "user.status" : "DESC"
          })
          .getRawMany();
          let list = [];
          friends.map(user=>{
            const {user_userid, user_name, user_sex, user_email,user_status} = user;
            const friend = {
              id: user_userid,
              name: user_name,
              sex: user_sex, 
              email: user_email,
              status: user_status
            }
            list.push(friend);
            
          })
          console.log(list)
          return list;
        }
        catch(err){
          return {error:err}
        }
        }

        async getInvitings(userId:string):Promise<userData[]|any>{
         
         try{
            const users = await getRepository(User)
            .createQueryBuilder("user")
            .leftJoin("user.users","friend")
            .where("friend.confirmed=:confirmed AND friend.friendUserid=:id",{confirmed:0,id:userId})
            .orderBy({
              "user.name": "ASC",
            })
            .getRawMany();
          let endResult = [];
          users.map(user=>{
              const {user_userid, user_name, user_sex, user_email} = user;
              const userData = {
                userid: user_userid,
                name: user_name,
                sex: user_sex, 
                email: user_email,
              }
              endResult.push(userData);
            });

          return endResult;
         }
         catch(err){
           return {error:err}
         }
        }

        async getActiveFriends(id:string):Promise<userData[]|any>{
          try{
            const users = await getRepository(User)
            .createQueryBuilder("user")
            .leftJoin("user.friends","friend")
            .where("friend.confirmed=:confirmed AND friend.friendUserid=:id",{confirmed:1,id:id})
            .orWhere("friend.confirmed=:confirmed AND friend.userUserid=:id",{confirmed:1,id:id})
            .andWhere("user.status=1")
            .orderBy({
              "user.name": "ASC",
            })
            .getRawMany();
          let endResult = [];
          users.map(user=>{
              const {user_userid, user_name, user_email,sex} = user;
              const userData = {
                id: user_userid,
                name: user_name,
                email: user_email,
                sex:sex,
              }
              endResult.push(userData);
            });
          console.log(endResult)
          return endResult;
         }
         catch(err){
           return {error:err}
         }
        }

        async confirmFriend(req: friendData):Promise<any>{
          try{
          const currentUser = await User.findOne({
            userid: req.userid,
          });
          const friendUser = await User.findOne({
            name:req.friendname
          });
          const friend = await Friend.findOne({
            user: friendUser,
            friend: currentUser
          })
          friend.confirmed = true;
          friend.save();

          return {ok:'success'}
        }
        catch(error){console.error(`${error.name} - ${error.message}`)}
        }

        async setStatus(status: string,userId:string):Promise<any>{
          try{
          const user = await User.findOne({
            userid:userId
          })
          if(status==='true') user.status = true;
          else if(status==='false') user.status = false;
          
          user.save();
        }
        catch(error){console.error(`${error.name} - ${error.message}`)}
        }
}
