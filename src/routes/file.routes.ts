import { Router } from 'express';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { updateFileOnS3, uploadFileToS3 } from '../service/s3.service.js';

dotenv.config();

const uploadRoute = Router();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

uploadRoute.post('/upload', async (req, res) => {
  try {
    const { fileName, mimeType, fileBuffer } = req.body;

    if (!fileName || !mimeType || !fileBuffer) {
      return res.status(400).json({ error: 'Missing file data' });
    }

    const buffer = Buffer.from(fileBuffer, 'base64');

    const fileUrl = await uploadFileToS3(buffer, fileName, mimeType);

    res.json({ url: fileUrl });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

uploadRoute.post('/edit', async (req, res) => {
  try {
    const { fileName, mimeType, fileBuffer, latestFile } = req.body;

    if (!fileName || !mimeType || !fileBuffer) {
      return res.status(400).json({ error: 'Missing file data' });
    }

    const buffer = Buffer.from(fileBuffer, 'base64');

    const fileUrl = await updateFileOnS3(buffer, fileName, mimeType, latestFile);

    res.json({ url: fileUrl });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});
export default uploadRoute;
