import { updateGiftImageUrl } from '@/actions/data/gift';
import { updateEventCoverImageUrl } from '@/actions/data/event';
import { getSignedURL } from '@/actions/upload-to-s3';
import { computeSHA256 } from './utils';

type UploadImageToAwsParams = {
  file: File;
  giftId: string;
};

type UploadEventCoverImageToAwsParams = {
  file: File;
  eventId: string;
};

export const uploadImageToAws = async ({
  file,
  giftId,
}: UploadImageToAwsParams) => {
  const checksum = await computeSHA256(file);

  const presignResponse = await getSignedURL({
    fileName: file.name,
    fileType: file.type,
    fileSize: file.size,
    giftId,
    checksum,
  });

  if (presignResponse.error || !presignResponse?.success) {
    return { error: presignResponse.error };
  }

  const imageUrl = presignResponse.success.split('?')[0];

  const awsImagePosting = await fetch(imageUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
      metadata: JSON.stringify({ giftId }),
    },
  });

  if (!awsImagePosting.ok) {
    return { error: awsImagePosting.statusText };
  }

  const updatedGift = await updateGiftImageUrl(imageUrl, giftId);

  if (updatedGift?.error) {
    return { error: updatedGift.error };
  }
};

export const uploadEventCoverImageToAws = async ({
  file,
  eventId,
}: UploadEventCoverImageToAwsParams) => {
  const checksum = await computeSHA256(file);

  const presignResponse = await getSignedURL({
    fileName: file.name,
    fileType: file.type,
    fileSize: file.size,
    eventId,
    checksum,
  });

  if (presignResponse.error || !presignResponse?.success) {
    return { error: presignResponse.error };
  }

  const imageUrl = presignResponse.success.split('?')[0];

  const awsImagePosting = await fetch(imageUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
      metadata: JSON.stringify({ eventId }),
    },
  });

  if (!awsImagePosting.ok) {
    return { error: awsImagePosting.statusText };
  }

  const updatedEvent = await updateEventCoverImageUrl({
    eventId,
    eventCoverImageUrl: imageUrl,
  });

  if (updatedEvent?.error) {
    return { error: updatedEvent.error };
  }

  return { success: 'Image uploaded and event updated successfully' };
};
