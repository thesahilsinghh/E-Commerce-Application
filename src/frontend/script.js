let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsInR5cGUiOiJjdXN0b21lciIsImlhdCI6MTcxNTk1MzQ4MCwiZXhwIjoxNzE1OTU3MDgwfQ.d4xXxPHI8YS9fcLqnRKXrGu57oSgfilsHOU4zEakg-U";
fetch("http://localhost:4200/api/products/", {
  headers: {
    authorization: token,
  },
})
  .then((response) => response.json())
  .then((data) => {
    let products = data.products;
    let table = document.getElementById("products");
    products.forEach((element) => {
      let row = document.createElement("tr");

      let name = document.createElement("td");
      let size = document.createElement("td");
      let price = document.createElement("td");

      name.textContent = element.name;
      size.textContent = element.size;
      price.textContent = element.price;
      row.appendChild(name);
      row.appendChild(size);
      row.appendChild(price);
      table.appendChild(row);
    });
  });
