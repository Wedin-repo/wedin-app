'use server';

import { auth } from '@/auth';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
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
  'video/mp4',
  'video/quicktime',
];

const maxFileSize = 1048576 * 10; // 1 MB

type GetSignedURLParams = {
  fileName: string;
  fileType: string;
  fileSize: number;
  checksum: string;
  // file: File;
};

// export const getSignedURL = async ({
//   fileName,
//   fileType,
//   fileSize,
//   checksum,
//   // file,
// }: GetSignedURLParams) => {
//   const session = await auth();
//
//   if (!session) {
//     return { failure: 'not authenticated' };
//   }
//
//   if (!allowedFileTypes.includes(fileType)) {
//     return { failure: 'File type not allowed' };
//   }
//
//   if (fileSize > maxFileSize) {
//     return { failure: 'File size too large' };
//   }
//
//   // const putObjectCommand = new PutObjectCommand({
//   //   Bucket: 'wedin-images-dev',
//   //   Key: fileName,
//   //   ContentType: fileType,
//   //   ContentLength: fileSize,
//   //   ChecksumSHA256: checksum,
//   // });
//   //
//   // const response = await s3Client.send(putObjectCommand);
//   // console.log('hello');
//   //
//   // // const url = await getSignedUrl(
//   // //   s3Client,
//   // //   putObjectCommand,
//   // // );
//   //
//   // console.log({ success: response });
//   //
//   // // Insert into user table
//   // return { success: response };
// };
//
export const getSignedURL = async (key: string) => {
  const session = await auth();

  if (!session) {
    return { failure: 'not authenticated' };
  }

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET,
    Key: key,
  });

  const signedUrl = await getSignedUrl(s3Client, putObjectCommand, {
    expiresIn: 60,
  });

  return { success: { url: signedUrl } };
};

export const getS3ObjectUrl = async (key: string) => {
  const objectUrlCommand = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET,
    Key: key,
  });

  const response = await s3Client.send(objectUrlCommand);

  if (response.Body) {
    return { success: response.Body.toString() };
  }
};
