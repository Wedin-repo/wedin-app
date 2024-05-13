'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import type React from 'react';
import { useState } from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';

type ImageUploadProps = {
  imgUrl?: string | null;
  setSelectedFile: (file: File | null) => void;
  previewUrl: string | null;
  setPreviewUrl: (url: string | null) => void;
  setError: (error: string | null) => void;
  error: string | null;
  fileInputRef: React.MutableRefObject<HTMLInputElement | null>;
};

function ImageUpload({
  imgUrl,
  setSelectedFile,
  previewUrl,
  setPreviewUrl,
  fileInputRef,
}: ImageUploadProps) {
  const [image, setImage] = useState(
    previewUrl || imgUrl || '../../../public/images/rings.svg'
  );
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] ?? null;

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
      setSelectedFile(file);
    } else {
      setPreviewUrl(null);
      setSelectedFile(null);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  console.log('imgUrl', imgUrl);
  console.log('previewUrl', previewUrl);

  return (
    <div className="flex flex-col gap-1.5">
      <Label>
        Imagen del regalo
        <span className="!text-xs font-normal text-secondaryTextColor ml-1">
          372px por 322px
        </span>
      </Label>
      <div className="flex flex-col gap-3 p-4 rounded-xl bg-primaryBorderColor">
        <div className="flex justify-center items-center rounded-xl border-2 border-dashed border-primaryTextColor h-[242px] sm:h-[322px] sm:w-[372px]">
          <Image
            src={image}
            width={500}
            height={500}
            alt="Vista previa de la imagen seleccionada"
            className="object-cover max-w-full max-h-full rounded-xl"
          />
        </div>
        <div className="">
          <Input
            ref={fileInputRef}
            id="imageUpload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/jpeg, image/png, image/heic, image/webp"
          />
          <Button
            type="button"
            variant="uploadImageButton"
            onClick={handleButtonClick}
          >
            <MdOutlineFileUpload fontSize={'18px'} />
            {imgUrl ? 'Cambiar imagen' : 'Subir imagen'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;
