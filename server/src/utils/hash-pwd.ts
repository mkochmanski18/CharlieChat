import * as crypto from 'crypto';

export const hashPwd = (p:string):string=>{
    const hmac = crypto.createHmac('sha512','asdfghqweuti123#@#lkkltjrejkhuy535&#345jnhhj');
    hmac.update(p);
    return hmac.digest('hex');
}