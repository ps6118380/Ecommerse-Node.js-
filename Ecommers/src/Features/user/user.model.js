import {getdb} from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
export default class userModel{
    constructor(name,email,password,type,id){
        this.name=name,
        this.email=email,
        this.password=password,
        this.type=type,
        this._id=id
    }
    
    
    static getall(){
        return users;
    }
}

const users = [{
    id:1,
    name:"pushpanjali singh",
    email:"ps6118380@gmail.com",
    password:'1234',
    type:"seller"
}];