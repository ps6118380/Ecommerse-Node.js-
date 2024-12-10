import { ObjectId ,ReturnDocument} from "mongodb";
import {getdb} from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class CartReposetary{
    static async add(userid,productid,quantity){
        
        try{
    //         //1; get the database
        const db = getdb();
    //     //2 get the collection
    const collection = db.collection('cartitems');
   await collection.insertOne({userid: new ObjectId(userid),productid:new ObjectId(productid), quantity});
   
    } catch (err) {
        console.error("Error in CartReposetary.add:", err.message);
        throw new ApplicationError("Something went wrong", 500);
    }


    
     }
     
     static async get(userid){
        try{
            //1; get the database
        const db = getdb();
        //2 get the collection
        console.log("querying cart item", userid);
        const collection = db.collection('cartitems');
        return await collection.find({userid: new ObjectId(userid)}).toArray();
        
    }catch(err){
        throw new ApplicationError("something went wrong",500);
    }
     }


     static async delete(userid,cartitemid){
        try{
            const db = getdb();
        //2 get the collection
        const collection = db.collection('cartitems');
        console.log('attempting to delete with userId:', userid, "cartitemid", cartitemid);

        const result =await collection.deleteOne({_id:new ObjectId(cartitemid),userid:new ObjectId(userid)});

         return result.deletedCount>0;

        }catch(err){
            console.log("error in delete method:", err);
            throw new ApplicationError("Something went wrong",500);
        }
        
    }
//     static async getnextcounter(db){
//         // const result = await collection("counters").findOneandUpdate({_id:'cartitems'},
//         //     {$inc:{value:1}},
//         //     {returnDocument:'after'}
//         // );
//         // console.log(result.value);
//         // return result.value;

//         const collection = db.collection('counters');

//     const result = await collection.findOneAndUpdate(
//         { _id: 'cartitems' },
//         { $inc: { value: 1 } },
//         { returnDocument: 'after' }
//     );

//     if (!result.value) {
//         console.error("Counter not found, initializing it.");
//         await collection.insertOne({ _id: 'cartitems', value: 1 });
//         return 1;
//     }

//     console.log("Counter value:", result.value.value);
//     return result.value.value;
//     }
 }