'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { IoImageOutline } from 'react-icons/io5';
import { MdOutlineFileUpload } from 'react-icons/md';

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validFileTypes = ['image/jpeg', 'image/png', 'image/heic'];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (file && validFileTypes.includes(file.type)) {
      setError(null);
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setError('Por favor suba una imagen .jpeg, .png o .heic');
      setPreviewUrl(null);
      setSelectedFile(null);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="flex flex-col gap-1.5">
      <Label>
        Imagen del regalo
        <span className="!text-xs font-normal text-secondaryTextColor ml-1">
          372px por 322px
        </span>
      </Label>
      <div className="flex flex-col gap-3 p-4 rounded-xl bg-secondaryBackgroundColor">
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div
          className={`border-dashed rounded-xl border-2 h-[212px] md:h-[324px] flex items-center justify-center text-secondaryTextColor ${
            error ? 'border-red-600 text-red-600' : 'border-secondaryTextColor'
          }`}
        >
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Vista previa de la imagen seleccionada"
              className="object-cover max-w-full max-h-full rounded-xl"
            />
          ) : (
            <IoImageOutline fontSize={'24px'} />
          )}
        </div>
        <div className="">
          <Input
            ref={fileInputRef}
            id="imageUpload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
          />
          <Button variant="uploadImageButton" onClick={handleButtonClick}>
            <MdOutlineFileUpload fontSize={'18px'} />
            {previewUrl ? 'Cambiar imagen' : 'Subir imagen'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;
