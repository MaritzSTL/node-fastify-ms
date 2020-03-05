import * as fastify from 'fastify';
import mongoose from 'mongoose';
import routes from './routes';
import { config } from './config';
const env = process.env.NODE_ENV;

const app = fastify.default({ logger: true });

routes.forEach(route => { app.route(route) });

const start = async (): Promise<void> => {
  try {
    await app.listen(config.app.port);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();

export default app;

if (env !== 'test') {
  mongoose
    .connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => app.log.info("Mongo connection established"))
    .catch(err => app.log.error(err));
}
