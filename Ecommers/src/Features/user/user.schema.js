// here we'll connect mongoose to server

import mongoose,{Types} from "mongoose";

export const userSchema = new mongoose.Schema({
    name:String,
    // email:{type:String, unique:true},
    // password:String ,
    email:{type:String, unique:true, required:true,
        match: [/.+\@.+\../,"please enter valid email"]
    } ,
    password:{type:String ,
        validate:{
            validator:function(value){
                return /^(?=.[@$!%?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(value);
            },
            message:"password should be btw 8-12 chars and have a special char"
        }
    },
    type:{type:String, enum:["customer","seller"]}
})