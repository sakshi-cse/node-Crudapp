const http = require("http");
const {
  getProducts,
  getProduct,
  createProduct,
} = require("./controllers/product_contorler");
const server = http.createServer((req, res) => {
  if (req.url === "/api/product" && req.method === "GET") {
    getProducts(req, res);
  } else if (req.url.match(/\/api\/product\/[0-9]+/) && req.method === "GET") {
    const id = req.url.split("/")[3];
    getProduct(req, res, id);
  } else if (req.url === "/api/product" && req.method === "POST") {
    createProduct(req, res);
  } else {
    res.writeHead(404, { "Content-type": "application/json" });
    res.end(JSON.stringify({ message: "not found" }));
  }
});
const PORT = process.env.PORT || 2000;
server.listen(PORT, () => console.log(`Server running at ${PORT}`));
