import 'dotenv/config';
import { PutObjectCommand, S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_2,
    secretAccessKey: process.env.SECRET_ACCESS_KEY_2,
  },
});

export const uploadFileToS3 = async (fileBuffer: Buffer, fileName: string, mimeType) => {
  const bucketName = process.env.BUCKET_NAME;
  const awsRegion = process.env.AWS_REGION;

  try {
    console.log('Uploading file to S3:', fileName);

    const splitedExtension = fileName.split('.');
    const extesion = splitedExtension.at(splitedExtension.length - 1);
    const fileKey = `${fileName}//${uuidv4()}.${extesion}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: fileKey,
        Body: fileBuffer,
        ContentType: mimeType,
        ContentDisposition: `attachment; filename="${fileName}"`,
      })
    );

    console.log('File uploaded successfully:', fileName);

    const url = `https://${bucketName}.s3.${awsRegion}.amazonaws.com/${fileKey}`;

    return url;
  } catch (error) {
    console.error('ERRORR uploading file:', error);
    throw new Error('File upload failed');
  }
};

export const updateFileOnS3 = async (fileBuffer: Buffer, fileName: string, mimeType, latestFile?: string) => {
  const bucketName = process.env.BUCKET_NAME;
  const awsRegion = process.env.AWS_REGION;

  console.log('Uploading file to S3:', fileName);

  if (latestFile) {
    try {
      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: bucketName,
          Key: latestFile,
        })
      );
      console.log('Latest file deleted');
    } catch (error) {
      console.error('Fail to delete the lates file: ', error);
    }
  }

  const splitedExtension = fileName.split('.');
  const extesion = splitedExtension.at(splitedExtension.length - 1);
  const fileKey = `${fileName}//${uuidv4()}.${extesion}`;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
      Body: fileBuffer,
      ContentType: mimeType,
      ContentDisposition: `attachment; filename="${fileName}"`,
    })
  );

  console.log('File uploaded successfully:', fileName);

  const url = `https://${bucketName}.s3.${awsRegion}.amazonaws.com/${fileKey}`;

  return url;
};
