const http = require("http");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("./controllers/product_contorler");
const server = http.createServer((req, res,id) => {
  if (req.url === "/api/product" && req.method === "GET") {
    getProducts(req, res);
  } else if (req.url.match(/\/api\/product\/([0-9]+)/) && req.method === "GET") {
    const id = req.url.split("/")[3];
    getProduct(req, res, id);
  } else if (req.url === "/api/product" && req.method === "POST") {
    const id = req.url.split('/')[3];
    createProduct(req, res,id);
  } 
  else if(req.url.match(/\/api\/product\/([0-9]+)/) && req.method === 'PUT'){
    const id = req.url.split('/')[3]
      updateProduct(req, res, id);
  }
  else if(req.url.match(/\/api\/product\/([0-9]+)/) && req.method ==='DELETE'){
    const id = req.url.split('/')[3];
      deleteProduct(req,res,id)
    
  }
  else {
    res.writeHead(404, { "Content-type": "application/json" });
    res.end(JSON.stringify({ message: "not found" }));
  }
});
const PORT = process.env.PORT || 2000;
server.listen(PORT, () => console.log(`Server running at ${PORT}`));
