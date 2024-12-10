import mongoose from "mongoose";
import {userSchema} from "./user.schema.js";
const userModel = mongoose.model('users', userSchema);


export default class userReposetary{

  static async resetpassword(userid, hashedpassword){
    try{
     let user = await userModel.findById(userid);
     if(user){
      user.password = hashedpassword;
      user.save();
     }else{
      throw new Error("User not found");
     }
    }catch(err){
      console.log(err);
    }

}

    static async signup(newuser){
        try{
         const user = new userModel(newuser);
         await user.save();
         return user;
        }catch(err){
          console.log(err);
        }

    }

    static async findByEmail(email){
        try{
         return await userModel.findOne({email});
        }catch(err){
          console.log(err);
        }

    }

}