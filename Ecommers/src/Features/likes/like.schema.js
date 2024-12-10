import mongoose from 'mongoose';
export const likeSchema = new mongoose.Schema({
    userid:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"users"
    },
    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:'types'
    },
    types:{
        type:String,
        enum:["products",'category']
    }
})