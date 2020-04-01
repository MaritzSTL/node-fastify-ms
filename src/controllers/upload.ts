import { FastifyRequest, FastifyReply } from "fastify";
import path from "path";
import { ServerResponse } from "http";
import AWS from "aws-sdk";
import { Storage } from "@google-cloud/storage";
import { config } from "../config";
import { createReadStream } from "fs";

const storage = new Storage({
  keyFilename: path.join(__dirname, '../../4d3e68bfea30.json'),
  projectId: 'mms-sandbox'
});
const filename = path.join(__dirname, './file.txt');
export const uploadGcs = async (req: FastifyRequest, reply: FastifyReply<ServerResponse>) => {
  try {
    const file = (req.raw as any).files["file"];
    const myBucket = storage.bucket(config.gcp.bucket);
    console.log(file)
    await myBucket.file(file.name).createWriteStream({
      resumable: false,
      gzip: true
    })
    reply.send("Upload successful")

    // await new Promise(res, )

    // console.log(myBucket)
    // Makes an authenticated API request.
    // const results = await storage.getBuckets();

    // const [buckets] = results;

    // console.log('Buckets:');
    // buckets.forEach((bucket) => {
    //   console.log(bucket.name);
    // });
  } catch (err) {
    console.error('ERROR:', err);
  }

  // try {
  //   const [files] = await storage.bucket(config.gcp.bucket).getFiles();

  //   console.log('Files:');
  //   files.forEach(file => {
  //     console.log(file.name);
  //   });
  // } catch (error) {
  //   console.error('ERROR:', error);
  // }

  // await storage.bucket(config.gcp.bucket).upload(filename, {
  //   gzip: true,
  //   metadata: {
  //     cacheControl: 'public, max-age=31536000',
  //   },
  // });

  // console.log(`${filename} uploaded to ${config.gcp.bucket}.`);
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
