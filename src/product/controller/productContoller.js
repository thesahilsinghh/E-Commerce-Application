import ProductModel from "../model/product.model.js";
export default class ProductController {
  getAll(req, res) {
    let products = ProductModel.getAll();
    res.status(200).send(products);
  }

  getProduct(req, res) {
    let product = ProductModel.get(req.params.id);
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send("Product Not Found with this id");
    }
  }

  addProduct(req, res) {
    let data = req.body;
    ProductModel.add(data);
    res.status(201).send("Added Successfully");
  }

  filterProduct(req, res) {
    const { minPrice, maxPrice } = req.query;
    console.log(req.query);
    let products = ProductModel.filter(minPrice, maxPrice);

    if (products) {
      res.status(200).send(products);
    } else {
      res.status(404).send("No Product Found");
    }
  }

  updateProduct(req, res) {
    let data = req.body;
    let updatedProduct = ProductModel.update(req.params.id, data);

    if (updatedProduct) {
      res.status(201).send(updatedProduct);
    } else {
      res.status(404).send("No Product Found");
    }
  }
  deleteProduct(req, res) {
    let product = ProductModel.delete(req.params.id);
    if (product) {
      res.status(201).send(product);
    } else {
      res.status(404).send("No Product Found");
    }
  }
}
