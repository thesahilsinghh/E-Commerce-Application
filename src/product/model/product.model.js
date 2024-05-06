export default class ProductModel {
  constructor(id, name, size, rate, price) {
    this.id = id;
    this.name = name;
    this.size = size;
    this.rate = rate;
    this.price = price;
  }

  static getAll() {
    return products;
  }
  static filter(minPrice, maxPrice) {
    let arr = products.filter((item) => {
      return item.price >= minPrice && item.price <= maxPrice;
    });
    return arr;
  }

  static get(id) {
    let product = products.find((item) => id == item.id);
    return product;
  }

  static update(id, data) {
    let idx = products.indexOf((item) => item.id == id);
    if (idx != -1) {
      products[idx].name = data.name;
      products[idx].size = data.size;
      products[idx].rate = data.rate;
      products[idx].price = data.price;
      return products[idx];
    }
  }

  static add(data) {
    let id = products.length + 1;
    let newProduct = new ProductModel(
      id,
      data.name,
      data.size,
      data.rate,
      data.price
    );
    products.push(newProduct);
  }
  static delete(id) {
    let idx = products.indexOf((item) => item.id == id);
    if (idx != -1) {
      let product = products[idx];
      products.splice(idx);
      return product;
    }
  }
}

var products = [
  {
    id: 1,
    name: "Denim Jeans",
    size: ["S", "M", "L", "XL"],
    rate: "4",
    price: 1999,
  },
  {
    id: 2,
    name: "Shoes",
    size: ["8", "9", "11"],
    rate: 4.2,
    price: 5000,
  },
];
