import { ObjectId } from "mongodb";
import {getdb} from "../../config/mongodb.js";
import mongoose from "mongoose";

import {reviewSchema} from "./review.schema.js";
import {productSchema} from "./product.schema.js";
import {categorySchema} from "./category.schema.js";

const productModel = mongoose.model('products', productSchema);
const reviewModel = mongoose.model('review', reviewSchema);
const categoryModel = mongoose.model('category', categorySchema);


import {ApplicationError} from "../../error-handler/applicationError.js";

export default class productReposetary{

    //add new product
    static async add(newproduct){
        try{
            //1; add product in product collection
        console.log(newproduct);
        newproduct.categories = newproduct.category.split(',');
        const product = new productModel(newproduct);
        const savedproduct = await product.save();
            
        //2.update category
        await categoryModel.updateMany(
            {_id:{$in: newproduct.categories}},
            {$push:{products:savedproduct._id}}
        )
    }catch(err){
        throw new ApplicationError("something went wrong",500);
    }
}

   //get all product 
   static async getall(){
    try{
    const db = getdb();
    const collection = db.collection('products');
    const product = await collection.find().toArray();

    console.log('fetched product', product);
    return product;
    }catch(err){
        console.error("Error fetching products:", err);
    throw new ApplicationError("something went wrong",500);
    }
   }

   static async getid(id){
    try{
        //1; get the database
    const db = getdb();
    //2 get the collection
    const collection = db.collection('products');
    const prod = await collection.findOne({_id:new ObjectId(id)});
    return prod;
    }catch(err){
    throw new ApplicationError("something went wrong",500);
    }
   }

   static async filterproduct(minprice,category){
    try{
    const db = getdb();
    const collection = db.collection('products');
    const filterExpression={};
    if(minprice){
        filterExpression.price= {$gte:parseFloat(minprice)}
    }
    if(category){
        filterExpression.category=category;
    }

    const result=  await collection.find(filterExpression).project({name:1,price:1,category:1,_id:0}).toArray();
    console.log(result);
    return result;
    }catch(err){
    throw new ApplicationError("something went wrong",500);
    }
   }


   static async rateproduct(userid,productid,rating){
    try{
        
        const producttoupdate = await productModel.findById(productid);
        if(!producttoupdate){
            throw new Error("product not found");
        }

        const userreview = await reviewModel.findOne({productid:productid,userid:userid});
        if(userreview){
            userreview.rating = rating;
            userreview.save();
        }else{
            const newreview = new reviewModel({
                productid:new ObjectId(productid),
                userid:new ObjectId(userid),
                rating:rating
            });
            newreview.save();
        }
        // 1; get the database
    // const db = getdb();
    // //2 get the collection

    // const collection = db.collection('products');
    // await collection.updateOne({_id:new ObjectId(productid)},
    // {$pull:{ratings:{userid:new ObjectId(userid)}}}
    // );

    // await collection.updateOne({_id:new ObjectId(productid)},
    // {$push:{ratings:{userid:new ObjectId(userid),rating}}}
    // );

    }catch(err){
    throw new ApplicationError("something went wrong",500);
    }
   }



   static async avgproductpricepercategory(){
    try{
        //1; get the database
    const db = getdb();
   
    return await db.collection('products').aggregate([
        {
           $unwind:"$ratings"
        },
        {
            $group:{
                _id:"$name",
                averagerating:{$avg:"$ratings.rating"}
            }
        }
    ]).toArray();
    
    }catch(err){
    throw new ApplicationError("something went wrong",500);
    }
   }




}