const Products = require("../models/productModels");
const { getPostData} = require('../utils')
// @desc gets all products
// @routes GET /api/product
async function getProducts(req, res) {
  try {
    const products = await Products.find();
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}

//@desc gets single product
//@Route GET /api/product/id
async function getProduct(req, res, id) {
  try {
    const product = await Products.findById(id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "product not found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error);
  }
}

//@desc create product
//@Route POST /api/product
async function createProduct(req, res) {
  try {
    
    const body = await getPostData(req)
    const { name, discription, price} = JSON.parse(body)

        const product = {
            name,
            discription,
            price,
          };
          const newProduct = await Products.create(product);
          res.writeHead(201, { "Content-Type": "application/json" });
          return res.end(JSON.stringify(newProduct))
  } catch (error) {
    console.log(error);
  }
}

//desc update Product
//Rout PUT /api/product
async function updateProduct(req,res,id){
    try{
        const product = await Products.findById(id);
        if(!product){
            res.writeHead(404,{'Content-Type':'application/json'})
            res.end(JSON.stringify({message: 'not found sorry'}))
        }
        else{
            const body = await getPostData(req);
            const { name, discription, price } = JSON.parse(body)
            const productData = {
                name: name || product.name,
                discription : discription || product.discription,
                price : price || product.price
            }

            const updatedProduct = await Products.updateProduct( id, productData)
            res.writeHead(200,{'Content-Type':'application/json'})
            return res.end(JSON.stringify(updatedProduct))
        }
    }
    catch (error){
        console.log(error);
    }
}

//@desc delete product
//@Route DELETE /api/product/id
async function deleteProduct(req,res,id){
    try{
        const product = await Products.findById(id);
        if(!product){
           res.writeHead(404,{'Content-Type':'application/json'})
           res.end(JSON.stringify({message:'something went wrong'}))
        }
        else{
        //   await Products.remove(id);
          res.writeHead(200,{'Content-Type':'application/json'})  
          res.end(JSON.stringify({message: `product ${id} removed`}))
        }
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
}
