const {
  fetchQuotes,
  fetchQuoteById,
  addQuote,
  updateQuote,
  deleteQuote,
  uploadAvatar
} = require("./controller");

const routes = [
  {
    method: "GET",
    url: "/api/quotes",
    handler: fetchQuotes
  },
  {
    method: "GET",
    url: "/api/quotes/:id",
    handler: fetchQuoteById
  },
  {
    method: "POST",
    url: "/api/quotes",
    handler: addQuote
  },
  {
    method: "PATCH",
    url: "/api/quotes/:id",
    handler: updateQuote
  },
  {
    method: "DELETE",
    url: "/api/quotes/:id",
    handler: deleteQuote
  },
  {
    method: "POST",
    url: "/api/avatar",
    handler: uploadAvatar
  }
];

module.exports = routes;
