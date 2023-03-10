const usersData = require("./users.json");

function age(users) {
  return users.filter((user) => user.age >= 50);
}

console.log(age(usersData));
