const Axios = require("axios");

const api = Axios.create({
  baseURL: "https://api.codenation.dev/v1/challenge/dev-ps/"
});
module.exports = api;
