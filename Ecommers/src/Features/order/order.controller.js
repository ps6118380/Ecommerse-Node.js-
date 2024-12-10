import orderreposetary from "./order.reposetary.js";

export default class ordercontroller{
    async placeorder(req,res){
        try {
            const userId = req.userid; 
            console.log(userId);

            await orderreposetary.placeorder(userId);
            res.send("Order has been placed successfully!");
        } catch (error) {
            console.error("Error placing order:", error.message);
            res.status(500).send("Failed to place order.");
        }
    }
   
}