const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fastify = require("fastify")({ logger: true });
const fileUpload = require("fastify-file-upload");
const routes = require("./routes");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useFindAndModify: false,
    useNewUrlParser: true
  })
  .then(() => console.log("Mongo connection established"))
  .catch(e => console.log(`Mongo connection failed due to, ${e}`));

fastify.get("/", async (request, reply) => {
  try {
    return { message: "Welcome!" };
  } catch (e) {
    console.log(e);
  }
});

fastify.register(fileUpload);

routes.forEach(route => fastify.route(route));

fastify.listen(process.env.PORT || 3000, "0.0.0.0", err => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`server running at ${fastify.server.address().port}`);
});
