import userModel from '../user/user.model.js';
import { ApplicationError } from "../../error-handler/applicationError.js";
export default class ProductModel{
    constructor(name,desc,price,image,category,size,id){
       this._id=id,
       this.name=name,
       this.desc=desc,
       this.price=price,
       this.image=image,
       this.category=category,
       this.size=size
    }

    // static getall(){
    //     return products;
    // }


    // static add(product){
    //     product.id = products.length+1;
    //     products.push(product);
    //     return product;
    // }

    // static getid(id){
      
    //     const prod= products.find((p)=>p.id== id);
    //     return prod;
    // }

    // static filterproduct(minprice,maxprice){
    //   const filterp = products.filter((p)=>{
    //     return (p.price>=minprice && p.price<=maxprice);
    //   });
    //   return filterp;
    // }
    
    // static rateproduct(userid,productid,rating){
      
    // console.log(`Looking for product with id: ${productid}, rated by user: ${userid}, and rating is : ${rating}`);

    //   const user = userModel.getall().find((u)=>u.id==userid);
    //   if(!user){
    //     // return "user not found";
    //     throw new ApplicationError("user not found",404);
    //   }
    //   const product = products.find((prod)=>prod.id==productid);
    //   if(!product){
    //     console.log('No product found with the given ID');
    //     throw new ApplicationError("product not found",404);
    //   }
    //   if(!product.ratings){
    //     product.ratings =[];
    //     product.ratings.push({
    //       userid:userid,
    //       rating:rating
    //     });
    //   }else{
    //     product.ratings.push({
    //       userid:userid,
    //       rating:rating,
    //     });
    //   }
    //   console.log('Products array:', products);
    
    // }
}



var products = [
    new ProductModel(
      1,
      'Product 1',
      'Description for Product 1',
      19.99,
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
      'Cateogory1',
      ['M', 'XL']
    ),
    new ProductModel(
      2,
      'Product 2',
      'Description for Product 2',
      29.99,
      'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
      'Cateogory2',
      ['M', 'XL']
    ),
    new ProductModel(
      3,
      'Product 3',
      'Description for Product 3',
      39.99,
      'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
      'Cateogory3',
      ['M', 'XL','S']
    )];