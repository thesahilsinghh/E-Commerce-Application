import { ApplicationError } from "../../../middlewares/errorHandling.middleware.js";
import ProductModel from "../model/product.model.js";
import ProductRepository from "../repository/product.repository.js";
export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  //get all products
  async getAll(req, res) {
    try {
      let products = await this.productRepository.getAll();
      res.status(200).send(products);
    } catch (err) {
      throw new ApplicationError(500, "Error found! please try again later");
    }
  }

  //get product by id
  async getProduct(req, res) {
    try {
      let product = await this.productRepository.get(req.params.id);
      if (product) {
        res.status(200).send(product);
      } else {
        res.status(404).send("Product Not Found with this id");
      }
    } catch (err) {
      throw new ApplicationError(500, "Error found! please try again later");
    }
  }

  //add products
  async addProduct(req, res) {
    try {
      let data = req.body;
      console.log(data);
      const imageURL = "./public/images/" + req.file.filename;
      let sizes = req.body.size.split(",");
      let product = new ProductModel(
        req.body.name,
        sizes,
        parseFloat(req.body.price),
        imageURL,
        req.body.desc
      );
      await this.productRepository.add(product);
      res.status(201).send("Added Successfully");
    } catch (err) {
      throw new ApplicationError(500, "Error found! please try again later");
    }
  }

  //fiter products
  async filterProduct(req, res) {
    try {
      console.log('hello')
      
      const { minPrice, maxPrice } = req.query;
      let products = await this.productRepository.filter(minPrice, maxPrice);

      if (products) {
        res.status(200).send(products);
      } else {
        res.status(404).send("No Product Found");
      }
    } catch (err) {
      throw new ApplicationError(500, "Error found! please try again later");
    }
  }

  //rating
  async rateProduct(req, res, next) {
    try {
      let { productID, rating } = req.query;
      let userID = req.payload.id;
      let product =await this.productRepository.rate(productID, userID, rating);
      res.status(201).send("Rated Successfully!");
    } catch (err) {
      console.log("Passing error to error handler");
      next(err);
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
