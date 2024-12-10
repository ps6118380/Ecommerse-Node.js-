import userModel from '../Features/user/user.model.js';
const basicauth = (req,res,next)=>{
    const headers = req.headers['authorization'];
    console.log(req.headers);
    console.log(headers);
    if(!headers){
        return res.send('getting wrong credentials');
    }
    const base64creds = headers.replace('Basic ',' ');
    const decodedata = Buffer.from(base64creds,'base64').toString('utf8');
    console.log(decodedata);
    const creds = decodedata.split(":");
    const users = userModel.signin(creds[0],creds[1]);
    if(users){
        next();
    }else{
        res.status(400).send("invalid credentials");
    }
    
}
export default basicauth;