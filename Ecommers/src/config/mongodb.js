// import {mongoClient} from "mongodb";

import {MongoClient} from "mongodb";

// const url = "mongodb://localhost:27017/mydb";

let clientdb;
export const ConnectToMongoDB =async()=>{
    MongoClient.connect(process.env.DB_URL)
    .then(client=>{
        clientdb=client;
        console.log("MongoDB is connected");
        const db = client.db()
        createCounter(db);
        createIndex(db);
    }).catch((err)=>{
        console.log(err);
    })
}

export const getdb=()=>{
    if(!clientdb){
        throw new Error("Database connection is not established");
    }
     return clientdb.db();
}
// export default ConnectToMongoDB;



//why we use this ? just we get id in integer not as objectId
const createCounter = async(db)=>{
    // if record of existingcounter already exist then do nothing
    const cartcounter = await db.collection("counters").findOne({_id:'cartitems'});
    //else create one
    if(!cartcounter){
        await db.collection("counters").insertOne({_id:'cartitems',value:0});
    }
    // if record of existingcounter already exist then do nothing
    const productcounter = await db.collection("counters").findOne({_id:'products'});
    //else create one
    if(!productcounter){
        await db.collection("counters").insertOne({_id:'products',value:0});
    }

}


const createIndex= async(db)=>{
    try{
        await db.collection('products').createIndex({price:1});
        await db.collection('products').createIndex({name:1, category:-1});
        await db.collection('products').createIndex({desc:"text"});
    }catch(err){
        console.log(err);
    }
}