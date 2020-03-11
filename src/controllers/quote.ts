import Quote from "../models/quote";
import { FastifyRequest, FastifyReply } from 'fastify';
import { ServerResponse } from "http";

export const fetchQuotes = async (req: FastifyRequest, reply: FastifyReply<ServerResponse>) => {
  try {
    const quotes = await Quote.find({});
    return quotes;
  } catch (err) {
    console.log(err);
  }
};

export const fetchQuoteById = async (req: FastifyRequest, reply: FastifyReply<ServerResponse>) => {
  try {
    const quote = await Quote.findOne({ _id: req.params.id });
    return quote;
  } catch (err) {
    console.log(err);
  }
};

export const addQuote = async (req: FastifyRequest, reply: FastifyReply<ServerResponse>) => {
  try {
    const quote = new Quote({ ...req.body });
    return quote.save();
  } catch (err) {
    console.log(err);
  }
};

export const updateQuote = async (req: FastifyRequest, reply: FastifyReply<ServerResponse>) => {
  try {
    const { id } = req.params;
    const quote = req.body;
    const updatedQuote = await Quote.findOneAndUpdate({ _id: id }, quote, {
      new: true
    });
    return updatedQuote;
  } catch (err) {
    console.log(err);
  }
};

export const deleteQuote = async (req: FastifyRequest, reply: FastifyReply<ServerResponse>) => {
  try {
    const { id } = req.params;
    const quote = await Quote.findOneAndDelete({ _id: id });
    return quote;
  } catch (err) {
    console.log(err);
  }
};

export const uploadAvatar = async (req: FastifyRequest, reply: FastifyReply<ServerResponse>) => {
  const files = (req.raw as any).files;
  console.log(files);
  let fileArr = [];
  for (let key in files) {
    fileArr.push({
      name: files[key].name,
      mimetype: files[key].mimetype
    });
  }
  console.log(fileArr[0].name);
  reply.send(fileArr);
};
