import Quote from "../models/quote";
import { FastifyRequest, FastifyReply, FastifyContext } from "fastify";
import { ServerResponse } from "http";

export const index = async (req: FastifyRequest, reply: FastifyReply<ServerResponse>) => {
	try {
		const quotes = await Quote.find({});
		return quotes;
	} catch (err) {
		console.log(err);
	}
};

export const show = async (req: FastifyRequest, reply: FastifyReply<ServerResponse>) => {
	try {
		const quote = await Quote.findOne({ _id: req.params.id });
		return quote;
	} catch (err) {
		console.log(err);
	}
};

export const create = async (req: FastifyRequest, reply: FastifyReply<ServerResponse>) => {
	try {
		const quote = new Quote({ ...req.body });
		return quote.save();
	} catch (err) {
		console.log(err);
	}
};

export const update = async (req: FastifyRequest, reply: FastifyReply<ServerResponse>) => {
	try {
		const { id } = req.params;
		const quote = req.body;
		const updatedQuote = await Quote.findOneAndUpdate({ _id: id }, quote, {
			new: true,
		});
		return updatedQuote;
	} catch (err) {
		console.log(err);
	}
};

export const destroy = async (req: FastifyRequest, reply: FastifyReply<ServerResponse>) => {
	try {
		const { id } = req.params;
		const quote = await Quote.findOneAndDelete({ _id: id });
		return quote;
	} catch (err) {
		console.log(err);
	}
};
