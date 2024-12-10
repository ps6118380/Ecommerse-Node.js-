import cartModel from './cart.modal.js';
import CartReposetary from './cart.reposetary.js';
import { ApplicationError } from "../../error-handler/applicationError.js";
export default class cartcontroller{
    async addcartitem(req,res,next){
        try{
            const userid = req.userid;
            const {productid,quantity} = req.query;
            const item = await CartReposetary.add(userid,productid,quantity);
            console.log(item);
            res.status(200).send("cart is updated.");
        }catch(err){
            next(err);
        }
        
    }


    async getcartitem(req,res){
        
        try{
        const userid = req.userid;
        console.log("fetching cartitem userid" , userid);
        const items = await CartReposetary.get(userid);
        console.log("fetching items" , items)
        res.status(200).send(items);
        
        }catch(err){
            throw new ApplicationError("Something wen wrong",500);
        }

    }
    async deletecartitem(req,res){
        
        try {
            const userid = req.userid;  // Ensure this is set correctly
            const cartitemid = req.params.id;  // Cart item ID from the URL
   
            console.log("Deleting cart item with UserID:", userid, "CartItemID:", cartitemid);
   
            const cartitem = await CartReposetary.delete(userid, cartitemid);
            if (!cartitem) {
                return res.status(404).send("no Cart item found");
            } 
                return res.status(200).send("cart item is deleted");
            
   
        } catch (err) {
            console.error("Error in deletecartitem:", err);
            throw new ApplicationError("Something went wrong", 500);
        }
    }
}