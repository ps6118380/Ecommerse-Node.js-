import ProductModel from './prod.model.js';
import productReposetary from './prod.newreposetary.js';
export default class productscontroller{
    async getallproduct(req,res,next){
        try{
          const products = await productReposetary.getall();
          res.status(200).send(products);
        }catch(err){
            console.log(err);
            next(err);
        }
    }

   async postproduct(req,res,next){
    try {
      const { name, desc, price, categories, sizes } = req.body;

      if (!req.file) {
          console.error('File not uploaded:', req.file);
          return res.status(400).json({ error: 'No file uploaded!' });
      }

      console.log("req.file:", req.file); // Ensure multer is processing the file
      console.log("req.body:", req.body); // Ensure body is parsed correctly

      const imageUrl = `/upload/${req.file.filename}`;
      const newProduct = new ProductModel(name, desc, parseFloat(price), imageUrl, categories, sizes.split(','));

      const createdProduct = await productReposetary.add(newProduct);
      res.status(200).send(createdProduct);
  } catch (err) {
      console.error(err);
      next(err);
  }
    }
    async getoneproduct(req,res){
      
      try{
        const id= req.params.id
      const product = await productReposetary.getid(id);
      if(!product){
        res.status(404).send('ther is no any product');
      }else{
        res.status(200).send(product);
      }

      }catch(err){
          console.log(err);
          next(err);
      }
      
    }

    async getfilterproduct(req,res){

      try{
        const minprice = req.query.minprice;
      const category = req.query.category;
      const result =await productReposetary.filterproduct(minprice, category);
      res.status(200).send(result);
      console.log(result);

      }catch(err){
          console.log(err);
          next(err);
      }
    }
    async getrateproduct(req,res,next){
      try{
        const userid = req.userid;
        const productid = req.query.productid;
        const rating = req.query.rating;
        if (!userid || !productid || isNaN(rating)) {
            return res.status(400).send("Invalid input data. Ensure all fields are provided and valid.");
        }
        const result = await productReposetary.rateproduct(userid, productid, rating);
        console.log("Update Result:", result);
      return res.status(200).send('Rating added successfully');
      
    } catch(err) {
      next(err); 

    }

     }
    async averageprice(req,res,next){
      try{
         
        const result = await productReposetary.avgproductpricepercategory();
        res.status(200).send(result);
      }catch(err){
        next(err);
      }
    }
}