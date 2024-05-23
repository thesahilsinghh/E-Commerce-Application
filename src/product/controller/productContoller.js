import ProductModel from "../model/product.model.js";
export default class ProductController {
  //get all products
  getAll(req, res) {
    let products = ProductModel.getAll();
    res.status(200).send(products);
  }

  //rating
  rateProduct(req, res) {
    let { productID, rating } = req.query;
    let userID = req.payload.id;
    try {
      ProductModel.rate(userID, productID, rating);
      res.status(201).send("Product rated successfully");
    } catch (err) {
      res.status(err.statusCode).send(err.message);
    }
  }

  //get product by id
  getProduct(req, res) {
    let product = ProductModel.get(req.params.id);
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send("Product Not Found with this id");
    }
  }

  //add products
  addProduct(req, res) {
    let data = req.body;
    const imageURL = "./public/images/" + req.file.filename;
    ProductModel.add(data, imageURL);
    res.status(201).send("Added Successfully");
  }

  //fiter products
  filterProduct(req, res) {
    const { minPrice, maxPrice } = req.query;
    let products = ProductModel.filter(minPrice, maxPrice);

    if (products) {
      res.status(200).send(products);
    } else {
      res.status(404).send("No Product Found");
    }
  }

  //updating
  updateProduct(req, res) {
    let data = req.body;
    let updatedProduct = ProductModel.update(req.params.id, data);

    if (updatedProduct) {
      res.status(201).send(updatedProduct);
    } else {
      res.status(404).send("No Product Found");
    }
  }

  //deleting
  deleteProduct(req, res) {
    let product = ProductModel.delete(req.params.id);
    if (product) {
      res.status(201).send(product);
    } else {
      res.status(404).send("No Product Found");
    }
  }
}
