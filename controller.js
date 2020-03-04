const Quote = require("./models/quote");

const fetchQuotes = async (req, reply) => {
  try {
    const quotes = await Quote.find({});
    return quotes;
  } catch (err) {
    console.log(err);
  }
};

const fetchQuoteById = async (req, reply) => {
  try {
    const quote = await Quote.findOne({ _id: req.params.id });
    return quote;
  } catch (err) {
    console.log(err);
  }
};

const addQuote = async (req, reply) => {
  try {
    const quote = new Quote({ ...req.body });
    return quote.save();
  } catch (err) {
    console.log(err);
  }
};

const updateQuote = async (req, reply) => {
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

const deleteQuote = async (req, reply) => {
  try {
    const { id } = req.params;
    const quote = await Quote.findOneAndDelete({ _id: id });
    return quote;
  } catch (err) {
    console.log(err);
  }
};

const uploadAvatar = async (req, reply) => {
  const files = req.raw.files;
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

module.exports = {
  fetchQuotes,
  fetchQuoteById,
  addQuote,
  updateQuote,
  deleteQuote,
  uploadAvatar
};
