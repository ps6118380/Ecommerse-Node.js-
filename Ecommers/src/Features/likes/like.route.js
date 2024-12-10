import express from 'express';
import {likeController} from './like.controller.js';


const likecontroller = new likeController();
const likeRouter = express.Router();

likeRouter.post("/",likecontroller.likeItems);
export default likeRouter;