import { FastifyRequest, FastifyReply } from 'fastify';
import { ServerResponse } from "http";
import AWS from 'aws-sdk';
import { config } from '../config';

const s3 = new AWS.S3({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey
})

export const uploadAvatar = async (req: FastifyRequest, reply: FastifyReply<ServerResponse>) => {
  const file = (req.raw as any).files['file'];
  // console.log(files['file']);
  // let fileArr = [];
  // for (let key in files) {
  //   fileArr.push({
  //     name: files[key].name,
  //     mimetype: files[key].mimetype
  //   });
  // }
  // console.log(fileArr[0].name);
  // reply.send(fileArr);

  const tenantId: string = 'nh-001234';
  const collection: string = 'yolo';
  const data = Buffer.from(file.data, 'binary');
  const fileName: string = file.name;
  const key: string = `dam/upload/${collection}/${tenantId}/${fileName}`;

  let params = {
    Body: data,
    Bucket: config.aws.bucket,
    ContentType: 'application/pdf',
    Key: key,
    ACL: "public-read" // TODO: Remove/Update for prod
  }

  s3.getSignedUrl('putObject', params, (err, url) => reply.send({ key, url }))

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