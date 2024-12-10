import mongoose from "mongoose";
import {likeSchema} from "./like.schema.js";

const likeModel = mongoose.model('like',likeSchema);

export default class likeReposetary{
    static async likeProduct(userid,id){
       const likedproduct = new likeModel({userid:userid,likeable:id,type:'products'});
       const savedproduct = await likedproduct.save();
       return savedproduct;
    }

    static async likeProductCategory(userid,id){
        const likedcategory = new likeModel({userid:userid,likeable:id,type:'category'});
        const savedcategory = await likedcategory.save();
        return savedcategory;
     }

}