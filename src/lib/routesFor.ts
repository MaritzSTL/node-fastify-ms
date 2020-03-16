import { RouteOptions, RequestHandler } from "fastify";

export interface RoutableController {
	index: RequestHandler;
	show: RequestHandler;
	create: RequestHandler;
	update: RequestHandler;
	destroy: RequestHandler;
}

interface RoutableOptions {
	controller: RoutableController;
	resourceNamePlural: string;
	namespace?: string;
}

export default ({ controller, resourceNamePlural, namespace }: RoutableOptions): Array<RouteOptions> => {
	return [
		{
			method: "GET",
			url: `/${namespace}/${resourceNamePlural}`,
			handler: controller.index,
		},
		{
			method: "GET",
			url: `/${namespace}/${resourceNamePlural}/:id`,
			handler: controller.show,
		},
		{
			method: "POST",
			url: `/${namespace}/${resourceNamePlural}`,
			handler: controller.create,
		},
		{
			method: "PUT",
			url: `/${namespace}/${resourceNamePlural}/:id`,
			handler: controller.update,
		},
		{
			method: "PATCH",
			url: `/${namespace}/${resourceNamePlural}/:id`,
			handler: controller.update,
		},
		{
			method: "DELETE",
			url: `/${namespace}/${resourceNamePlural}/:id`,
			handler: controller.destroy,
		},
	];
};
