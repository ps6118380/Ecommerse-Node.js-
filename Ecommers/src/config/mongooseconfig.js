import mongoose from "mongoose";
import {categorySchema} from "../Features/product/category.schema.js";
export const connectWithMongoose = async()=>{
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("mongodb is connected using mongoose");
        // addcategories();
    }catch(err){
        console.log(err);
    }
}

// async function addcategories(){
//     const categoryModel = mongoose.model("category",categorySchema);
//     const categories =await categoryModel.find();
//     if(!categories || (categories).length==0){
//         await categoryModel.insertMany([{name:"books"},{name:"clothing"},{name:"eclectronic"}]);
//     }
//     console.log("categories added");
// }