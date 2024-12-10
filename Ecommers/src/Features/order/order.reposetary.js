import { ObjectId } from "mongodb";
import {getdb} from "../../config/mongodb.js";
import orderModel from "./order.model.js";
export default class orderreposetary{
    static async placeorder(userid){
        // 1-get the cart items and calculate total price
         const items =await this.gettotalamount(userid);
       
        // if (!items || items.length === 0) {
        //     throw new Error("No items in the cart for this user.");
        // }

        const totalfinalprice = items.reduce(
            (sum, item) => sum + item.totalprice, 
            0
        );
         const db =getdb();
        //2-create an order record
        const neworder = new orderModel(new ObjectId(userid),totalfinalprice,new Date());
        await db.collection("orders").insertOne(neworder);
        
        //3-reduce the stock
        for(let item of items){
        await db.collection("products").updateOne(
            {_id:item.productId},
            {$inc:{stock:-item.quantity}}
        )
        }
        //4-clear the cart
        // await db.collection("cartitems").deleteMany(
        //     {userid:new ObjectId(userid)}
        // )
        return;
    }
    static async gettotalamount(userid){
       const db = getdb();
       const items = await db.collection('cartitems').aggregate([
        {
            $match:{userid:new ObjectId(userid)}
        },
        //get the products fro products collections
        {
            $lookup:{
                from:"products",
                localField:"productid",
                foreignField:"_id",
                as:"productinfo"
            }
        },
        {
            $unwind:"$productinfo"
        },
        // {
        //     $addFields:{
        //         "totalprice":{
        //             $multiply:["$productinfo.price","$quantity"]//quantity*price
        //         }
        //     }
        // }
   
    ]).toArray();
       const totalfinalprice = items.reduce((sum,item)=>sum+item.totalprice,0);
       console.log(totalfinalprice);
       return items;

    }

}