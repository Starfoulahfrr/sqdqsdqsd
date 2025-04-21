import { useState } from 'react';
import { TextInput, Textarea, NumberInput, Button, Stack } from '@mantine/core';
import { MediaUploader } from './MediaUploader';
import { Product } from '../types';

interface ProductFormProps {
  initialData?: Partial<Product>;
  onSubmit: (data: Partial<Product>) => void;
  onCancel: () => void;
}

export const ProductForm = ({ initialData, onSubmit, onCancel }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    price: initialData?.price || '',
    description: initialData?.description || '',
    media: initialData?.media || []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing="md">
        <TextInput
          required
          label="Nom du produit"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        
        <TextInput
          required
          label="Prix"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        
        <Textarea
          required
          label="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          minRows={4}
        />
        
        <MediaUploader
          onUpload={(files) => {
            // Traitement des fichiers uploadés
            const newMedia = files.map((file, index) => ({
              id: `temp-${index}`,
              type: file.type.startsWith('image/') ? 'photo' : 'video',
              file,
              orderIndex: formData.media.length + index
            }));
            setFormData({ ...formData, media: [...formData.media, ...newMedia] });
          }}
        />

        <Button.Group>
          <Button type="submit" color="blue">
            {initialData ? 'Modifier' : 'Ajouter'}
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Annuler
          </Button>
        </Button.Group>
      </Stack>
    </form>
  );
};