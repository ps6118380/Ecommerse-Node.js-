
import mongoose,{Types} from "mongoose";
export const cartSchema = new mongoose.Schema({

   productid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'products'
   },
   userid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users'
   },
   quantity:Number
})