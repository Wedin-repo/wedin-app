'use server';

import { auth } from '@/auth';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

const allowedFileTypes = [
  'image/jpeg',
  'image/png',
  'image/heic',
  'image/webp',
];

type GetSignedURLParams = {
  fileName: string;
  fileType: string;
  fileSize: number;
  giftId: string;
  checksum: string;
};

const maxFileSize = 1048576 * 100; // 10 MB

export const getSignedURL = async ({
  fileName,
  fileType,
  fileSize,
  giftId,
  checksum,
}: GetSignedURLParams) => {
  const session = await auth();

  if (!session) {
    return { error: 'not authenticated' };
  }

  if (!allowedFileTypes.includes(fileType)) {
    return { error: 'File type not allowed' };
  }

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET,
    Key: fileName,
    ContentType: fileType,
    ContentLength: fileSize,
    ChecksumSHA256: checksum,
    Metadata: {
      giftId: giftId,
    },
  });

  if (fileSize > maxFileSize) {
    return { error: 'File size too large' };
  }

  const signedUrl = await getSignedUrl(s3Client, putObjectCommand, {
    expiresIn: 60,
  });

  return { success: { url: signedUrl } };
};
