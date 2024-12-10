import likeReposetary from "./like.reposetary.js";

export class likeController{
    
    async likeItems(req,res){
        try{
          const {id,type} = req.body;
          if(type=='products'){
            await likeReposetary.likeProduct(req.userid,id);
          }else{
            await likeReposetary.likeProductCategory(req.userid,id);
          }
          res.status(200).send("Liked product");
        }catch(err){
            console.log(err);
        }
    }
}