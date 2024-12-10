import {getdb} from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class usernewReposetary{

    static async signup(newuser){
        try{
        //1; get the database
        const db = getdb();
        //2 get the collection
        const collection = db.collection('users');
        // const newuser = new userModel(name,email,password,type);
        // newuser.id = users.length+1;
        // users.push(newuser);

        //3 insert the document
        await collection.insertOne(newuser);
        return newuser;
    }catch(err){
        throw new ApplicationError("something went wrong",500);
    }
    }
     static async findByEmail(email){
       
        try{
            //1; get the database
            const db = getdb();
            console.log('Database retrieved successfully');
            //2 get the collection
            const collection = db.collection('users');
            console.log('collection retrieved successfully');
            
            const user =await collection.findOne({email});
            console.log('User retrieved from DB:', user);
            return  user;
        }catch(err){
            throw new ApplicationError("something went wrong",500);
        }
     }
    static async signin(email,password){
        try{
            //1; get the database
            const db = getdb();
            console.log('Database retrieved successfully');
            //2 get the collection
            const collection = db.collection('users');
            console.log('collection retrieved successfully');
            return await collection.findOne({email,password});
        }catch(err){
            throw new ApplicationError("something went wrong",500);
        }
    }

}