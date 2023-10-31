const Products = require("../models/productModels");

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
    let body = "";
    req.on("data", (chunck) => {
      body += chunck.toString();
    });
    req.on("end", async () => {
      const { name, discription, price } = JSON.parse(body);
      const product = {
        name,
        discription,
        price,
      };
      const newProduct = await Products.create(product);
      res.writeHead(201, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(newProduct));
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
};
