import userModel from './user.model.js';
import jwt from 'jsonwebtoken';
// 
import userReposetary from './user.newreposetary.js';
import bcrypt from 'bcrypt';
export default class usercontroller{

 async resetPassword(req,res){
  const {newPassword} = req.body;
  const UserId = req.userid;
  console.log(newPassword);
  console.log(UserId);
  const hashedpassword = await bcrypt.hash(newPassword,12);
  try{
    await userReposetary.resetpassword(UserId,hashedpassword);
    res.status(200).send('password is updated');
  }catch(err){
    console.log(err);
  }
 }

  async usersignup(req,res){
    const{name,email,password,type} = req.body;
    const hashedpassword = await bcrypt.hash(password,12);
    const newuser = new userModel(name,email,hashedpassword,type);
    
    await userReposetary.signup(newuser);

    // await userNewReposetary.signup(newuser);

    res.status(201).send(newuser);
  }


//   async usersignin(req,res,next){
//   try{
//     const {email,password} = req.body;
    
//     const user = await userReposetary.signin(email);

// // const user = await userReposetary.findByEmail(email);
// console.log('stored user:',user);
//  if(!user){
//   console.log('User not found');
//         res.status(404).send('invalid credentials');
//      }else{
//      const result =await bcrypt.compare(password,user.password);
//     //    console.log('Password comparison result:', result);

//        if(!result){
//         return res.status(400).send("invalid creds");
//        }
//        const token = jwt.sign({
//               userid:user.id,
//               email: email,
//             },
//             process.env.JWT_SECRET,
//             {expiresIn:'1h'}
            
//           );
//           return res.status(200).send(token);
//         }
//     //else{
//     //   const result =await bcrypt.compare(password,user.password);
//     //   console.log('Password comparison result:', result);
//     //   if(result){
//     //     const token = jwt.sign({
//     //       userid:user._id,
//     //       email: email,
//     //     },
//     //     process.env.JWT_SECRET,
//     //     {expiresIn:'1h'}
//     //   );
  
  
//     //       return res.status(200).send(token);
//     //   }else{
//     //     return res.status(400).send("invalid creds");
//     //   }
//     // }
//   }catch(err){
//     next(err);
//   }

//   }

async usersignin(req, res, next) {
  try {
      const { email, password } = req.body;

      const user = await userReposetary.findByEmail(email);
      console.log('Stored user in usersignin:', user);

      if (!user) {
          console.log('User not found');
          return res.status(404).send('Invalid credentials');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
          console.log('Password mismatch');
          return res.status(400).send('Invalid credentials');
      }

      const token = jwt.sign(
          { userid: user._id, email: email },
          'MR<y%)I+9qxf=@U',
          { expiresIn: '1h' }
      );

      return res.status(200).send({ token });
  } catch (err) {
      next(err);
  }
}


}