let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjgwZmFhNmMwZTkyMjVmYWNiYTQ2NSIsImVtYWlsIjoidXNlcjFAZW1haWwuY29tIiwidHlwZSI6InNlbGxlciIsImlhdCI6MTcyMTAxOTg3OCwiZXhwIjoxNzIxMDIzNDc4fQ.orjENKL_GA2TBNV04fTtKo-TGCFrAnTrwXVw1ApCCSU";
fetch("http://localhost:4200/api/products/", {
  headers: {
    authorization: token,
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log("hello")
      console.log(data);
      
    let products = data;
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
