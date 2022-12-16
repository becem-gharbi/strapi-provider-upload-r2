var {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

module.exports = {
  init({ accountId, accessKeyId, secretAccessKey, bucket, publicUrl }) {
    const s3Client = new S3Client({
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      region: "auto",
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    });

    const uploadHandler = async (file) => {
      return new Promise((resolve, reject) => {
        const params = {
          Bucket: bucket,
          Body: file.stream || file.buffer,
          Key: `${file.hash}${file.ext}`,
          ContentType: file.mime,
        };
        s3Client
          .send(new PutObjectCommand(params))
          .then(() => {
            file.url = `${publicUrl}/${params.Key}`;
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    };

    return {
      async upload(file) {
        return uploadHandler(file);
      },

      uploadStream(file) {
        return uploadHandler(file);
      },

      async delete(file) {
        return s3Client.send(
          new DeleteObjectCommand({
            Bucket: bucket,
            Key: `${file.hash}${file.ext}`,
          })
        );
      },
    };
  },
};
