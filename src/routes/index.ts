import { RouteOptions } from "fastify";
import routesFor from "../lib/routesFor";
import * as quotesController from "../controllers/quote";
import * as uploadsController from "../controllers/upload";

const uploadAvatarRoute: RouteOptions = {
	method: "POST",
	url: "/api/upload",
	handler: uploadsController.uploadAvatar,
};

const uploadGcsRoute: RouteOptions = {
	method: "POST",
	url: "/api/upload/gcp",
	handler: uploadsController.uploadGcs,
};

const routes = [
	...routesFor({ controller: quotesController, namespace: "api", resourceNamePlural: "quotes" }),
	uploadAvatarRoute, uploadGcsRoute
];

export default routes;
