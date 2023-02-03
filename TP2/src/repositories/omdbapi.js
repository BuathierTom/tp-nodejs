var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'http://www.omdbapi.com/',
  params: {s: 'The 100', apikey: '53d5de34'}
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});