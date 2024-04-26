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
        <span className="!text-xs font-normal text-secondaryTextColor">
          372px por 322px
        </span>
      </Label>
      <div className="bg-secondaryBackgroundColor rounded-xl p-4 flex flex-col gap-3">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div
          className={`border-dashed rounded-xl border-2 h-[212px] md:h-[324px] flex items-center justify-center text-secondaryTextColor ${error ? 'border-red-500 text-red-500' : 'border-secondaryTextColor'}`}
        >
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Vista previa de la imagen seleccionada"
              className="max-h-full max-w-full rounded-xl object-cover"
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
