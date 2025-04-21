import { useState } from 'react';
import { FileWithPath } from '@mantine/dropzone';

export const useMediaUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadMedia = async (file: FileWithPath) => {
    setIsUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setIsUploading(false);
      setProgress(100);
      return data.fileId;
    } catch (error) {
      setIsUploading(false);
      throw error;
    }
  };

  return {
    isUploading,
    progress,
    uploadMedia,
  };
};