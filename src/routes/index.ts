import * as quotesController from "../controllers/quote";
import { RouteOptions } from 'fastify';

const addQuoteRoute: RouteOptions = {
  method: "POST",
  url: "/api/quotes",
  handler: quotesController.addQuote
};
const fetchQuotesRoute: RouteOptions = {
  method: "GET",
  url: "/api/quotes",
  handler: quotesController.fetchQuotes
};
const fetchQuoteByIdRoute: RouteOptions = {
  method: "GET",
  url: "/api/quotes/:id",
  handler: quotesController.fetchQuoteById
};

const updateQuoteRoute: RouteOptions = {
  method: "PUT",
  url: "/api/quotes/:id",
  handler: quotesController.updateQuote
};

const deleteQuoteRoute: RouteOptions = {
  method: "DELETE",
  url: "/api/quotes/:id",
  handler: quotesController.deleteQuote
};

const uploadAvatarRoute: RouteOptions = {
  method: "POST",
  url: "/api/upload",
  handler: quotesController.uploadAvatar
}

const routes = [addQuoteRoute, fetchQuotesRoute, fetchQuoteByIdRoute, updateQuoteRoute, deleteQuoteRoute, uploadAvatarRoute];

export default routes;