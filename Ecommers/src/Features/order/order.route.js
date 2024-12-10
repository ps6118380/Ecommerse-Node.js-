import express from 'express';
import ordercontroller from './order.controller.js';

const orderRouter = express.Router();
const orderController = new ordercontroller();
orderRouter.post("/",orderController.placeorder);
export default orderRouter;