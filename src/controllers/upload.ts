import { FastifyRequest, FastifyReply } from "fastify";
import path from "path";
import { ServerResponse } from "http";
import AWS from "aws-sdk";
import { Storage } from "@google-cloud/storage";
import { config } from "../config";

const storage = new Storage({
  keyFilename: path.join(__dirname, '../../4d3e68bfea30.json'),
  projectId: 'mms-sandbox'
});
export const uploadGcs = async (req: FastifyRequest, reply: FastifyReply<ServerResponse>) => {

  const filename = path.join(__dirname, './file2.txt');
  const myBucket = config.gcp.bucket;

  await storage.bucket(myBucket).upload(filename, {
    // Support for HTTP requests made with `Accept-Encoding: gzip`
    gzip: true,
    // By setting the option `destination`, you can change the name of the
    // object you are uploading to a bucket.
    metadata: {
      // Enable long-lived HTTP caching headers
      // Use only if the contents of the file will never change
      // (If the contents will change, use cacheControl: 'no-cache')
      cacheControl: 'public, max-age=31536000',
    },
  });

  console.log(`${filename} uploaded to ${myBucket}.`);

  reply.send("Upload successful");
}

const s3 = new AWS.S3({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
});

export const uploadAvatar = async (req: FastifyRequest, reply: FastifyReply<ServerResponse>) => {
  const file = (req.raw as any).files["file"];
  const { tenantId, collection } = req.body;
  const data = Buffer.from(file.data, "binary");
  const fileName: string = file.name;
  const mimeType: string = file.mimetype;
  const key = `dam/upload/${collection}/${tenantId}/${fileName}`;

  const params = {
    Body: data,
    Bucket: config.aws.bucket,
    ContentType: mimeType,
    Key: key,
    ACL: "public-read", // TODO: Remove/Update for prod
  };

  s3.getSignedUrl("putObject", params, (err, url) => reply.send({ key, url }));

  s3.upload(params, function (err: Error, res: any) {
    if (err) {
      console.log("Error uploading data: ", err);
    } else {
      // Response ->
      // Location: 'https://<bucketName>.s3.amazonaws.com/path/to/file.pdf'
      // Key: 'path/to/file.pdf`
      console.log("Successfully uploaded data ", res);
    }
  });
};
