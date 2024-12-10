import jwt from 'jsonwebtoken';
const jwtauth = (req,res,next)=>{
    const token = req.headers["authorization"];
    if(!token){
       return res.status(401).send('unauthorized');
    }
    try{
        const payload = jwt.verify(token,'MR<y%)I+9qxf=@U');
        req.userid = payload.userid;
        console.log(payload);
    }catch(err){
        console.log(err);
        return res.status(400).send('unauthorized');
    }
    // req.userid = decoded.id;
    next();
}
export default jwtauth;



// try {
//     const payload = jwt.verify(token, 'MR<y%)I+9qxf=@U'); // Verifying the token with the secret key
//     req.userid = payload.userid; // Assuming the payload contains userid
//     console.log(payload); // Log the payload for debugging if needed
// } catch (err) {
//     console.log(err);
//     return res.status(400).send('Unauthorized');
// }

// // No need for 'decoded.id', use 'payload.userid' instead
// next();