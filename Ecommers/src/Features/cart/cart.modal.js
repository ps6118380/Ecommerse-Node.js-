import { ApplicationError } from "../../error-handler/applicationError.js";
export default class cartModel{
    constructor(productid,userid,quantity,id){
        this.productid = productid,
        this.userid = userid,
        this.quantity = quantity,
        this.id = id
    }
    // static add(userid,productid,quantity){
    //    const newcart = new cartModel(productid,userid,quantity);
    //    newcart.id = cartitems.length+1;
    //    cartitems.push(newcart);

    //    return newcart;
    // }
    // static get(userid){
    //     const result = cartitems.filter((item)=>item.userid == userid);
    //     return result;
    // }
    // static delete(userid,cartitemid){
    //     const cartitem = cartitems.findIndex((item)=>item.id==cartitemid && item.userid==userid);
    //     if(cartitem==-1){
    //         return 'item not found';
    //     }else{
    //          cartitems.splice(cartitem,1);
    //     }
      
    // }
}
var cartitems = [
    new cartModel(1,1,10,3),
    new cartModel(2,4,11,1),
]