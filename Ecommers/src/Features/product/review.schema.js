// we need who rated =userid , which product = product id, review = rating 
import mongoose,{Types} from "mongoose";

export const reviewSchema = mongoose.Schema({

    productid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products'
       },
       userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
       },
       rating:Number
   
})