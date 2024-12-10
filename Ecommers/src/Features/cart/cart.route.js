import express from 'express';
const cartrouter = express.Router();
import cartcontroller from './cart.controller.js';

const cartcont = new cartcontroller();

cartrouter.post('/',cartcont.addcartitem);
cartrouter.get('/',cartcont.getcartitem);
cartrouter.delete('/:id',cartcont.deletecartitem);
export default cartrouter;