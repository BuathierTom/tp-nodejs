const usersData = require("./users.json");
const productsData = require("./products.json");
const paniersData = require("./paniers.json");
const _ = require("lodash");

//console.log(_.uniq(productsData.map((item) => item.category)));
console.log(
  JSON.stringify(
    paniersData.map((item) => {
      delete item.total;
      delete item.discountedTotal;
      delete item.totalProducts;
      delete item.totalQuantity;
      item.products = item.products.map((product) => {
        delete product.discountedPrice;
        return product;
      });

      return item;
    })
  )
);
