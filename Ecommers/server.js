import dotenv from 'dotenv';
dotenv.config({ path: './Ecommers/.env' });
console.log("Current Working Directory:", process.cwd());
console.log("DB_URL:", process.env.DB_URL); // Confirm values are loaded
console.log("JWT_SECRET:", process.env.JWT_SECRET);

// dotenv.config({ path: './Ecommers/.env' });
import express from 'express';
import bodyParser from 'body-parser';
import swagger from 'swagger-ui-express';
import cors from 'cors';
 import productrouter from './src/Features/product/prod.route.js';
 import userrouter from './src/Features/user/user.route.js';
 import basicauth from './src/middleware/basicauth.middleware.js';
 import jwtauth from './src/middleware/jwt.middleware.js';
 import cartrouter from './src/Features/cart/cart.route.js';
 import orderrouter from './src/Features/order/order.route.js';
 import likeRouter from './src/Features/likes/like.route.js';
 import {ApplicationError} from "./src/error-handler/applicationError.js";

//  import {storagebox} from './src/middleware/upload.middleware.js';


 

 import loggermiddleware from './src/middleware/logger.middleware.js';

// import apidocs from './swagger.json' assert { type: "json" };
import { readFile } from 'fs/promises';

const apidocs = JSON.parse(await readFile(new URL('./swagger.json', import.meta.url)));

import {ConnectToMongoDB} from "./src/config/mongodb.js";
import {connectWithMongoose } from "./src/config/mongooseconfig.js";

const server= express();
// server.use((req,res,next)=>{
//   res.header("")
// })
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));
 

var coroptions ={
    origin:"http://localhost:5500"
    // origin: "*"
}
server.use(cors(coroptions));

server.use(loggermiddleware);  // Logs the requests after body parsing
server.use(bodyParser.json()); // Parses incoming requests as JSON



server.use('/api-docs', swagger.serve, swagger.setup(apidocs));


server.use('/api/products',jwtauth,productrouter);

server.use('/api/cartitems',jwtauth, cartrouter);
server.use('/api/user', userrouter);
server.use('/api/order',jwtauth, orderrouter);
server.use('/api/like',jwtauth, likeRouter);


server.get('/',(req,res)=>{
    res.send("hello we're in ecommerse wevsite");
});

server.use((err,req,res,next)=>{
    console.log(err);
    if(err instanceof ApplicationError){
     return res.status(err.code).send(err.message);
    }
   return res.status(500).send("Something went wrong, Please try again");

})

server.use((req,res)=>{
    res.status(404).send("api not fount please check your api docs.");
});

server.listen(3200,(req,res)=>{
    console.log('hello we are in 3200 port');
    // ConnectToMongoDB();
    connectWithMongoose();
});