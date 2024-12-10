import { ApplicationError } from "../../error-handler/applicationError.js";
export default class orderModel{
    constructor(userid,totalamount, timestamp){
        this.userid = userid,
        this.totalamount = totalamount,
        this.timestamp = timestamp

    }
}    