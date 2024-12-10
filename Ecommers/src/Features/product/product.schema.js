
import mongoose,{Types} from "mongoose";
export const productSchema = new mongoose.Schema({

    name :String,
    price :Number,
    categorey:String,
    description:String,
    instock:Number,
    categories:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"category"
        }
    ]
   
})