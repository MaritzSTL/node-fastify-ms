import * as fastify from 'fastify';
// import path from "path";
import fileUpload from 'fastify-file-upload';
// import googleCloudStorage from 'fastify-google-cloud-storage';
import mongoose from 'mongoose';
import routes from './routes';
import { config } from './config';
const env = process.env.NODE_ENV;

const app = fastify.default({ logger: true });

app.register(fileUpload);

// app.register(require('fastify-google-cloud-storage'), {
//   keyFilename: path.join(__dirname, '../4d3e68bfea30.json'),
//   projectId: 'mms-sandbox'
// })

// const cloudStorage = app.googleCloudStorage

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
