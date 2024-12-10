import express from 'express';
import usercontroller from './user.controller.js';
import jwtauth from '../../middleware/jwt.middleware.js'

const usercont = new usercontroller();
const userrouter = express.Router();

userrouter.post('/signup',usercont.usersignup);
userrouter.post('/signin',usercont.usersignin);
userrouter.put('/resetpassword',jwtauth,usercont.resetPassword);

export default userrouter;