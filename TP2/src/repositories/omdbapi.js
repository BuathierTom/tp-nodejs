var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'http://www.omdbapi.com/',
  params: {s: 'The 100', apikey: '43a891a3'}
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});