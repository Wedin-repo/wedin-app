import { getSignedURL } from '@/actions/upload-to-s3';
import { computeSHA256 } from './utils';

type UploadImageToAwsParams = {
  file: File;
  id: string;
  type?: 'giftId' | 'eventId';
};

export const uploadImageToAws = async ({
  file,
  id,
  type = 'giftId',
}: UploadImageToAwsParams) => {
  const checksum = await computeSHA256(file);

  const presignResponse = await getSignedURL({
    fileName: file.name,
    fileType: file.type,
    fileSize: file.size,
    id,
    type,
    checksum,
  });

  if (presignResponse.error || !presignResponse?.success) {
    return { error: presignResponse.error };
  }

  const imageUrl = presignResponse.success.split('?')[0];

  if (!imageUrl) {
    return { error: 'Failed to upload image' };
  }

  const awsImagePosting = await fetch(imageUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
      metadata: JSON.stringify({ id }),
    },
  });

  if (!awsImagePosting.ok) {
    return { error: awsImagePosting.statusText };
  }

  return { imageUrl: imageUrl };
};
//handle whats under this comment in the frontend where this function is triggered

//const updatedGift = await updateGiftImageUrl(imageUrl, giftId);

// if (updatedGift?.error) {
//   return { error: updatedGift.error };
// }

// const updatedEvent = await updateEventCoverImageUrl({
//     eventId,
//     eventCoverImageUrl: imageUrl,
//   });

//   if (updatedEvent?.error) {
//     return { error: updatedEvent.error };
//   }
