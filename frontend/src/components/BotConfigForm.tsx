import { useForm } from '@mantine/form';
import { TextInput, Textarea, Switch, Button, Stack, Select } from '@mantine/core';
import { MediaUploader } from './MediaUploader';
import { api } from '../utils/api';

interface BotConfigFormValues {
  welcomeMessage: string;
  bannerImage?: string;
  orderButton: {
    type: 'url' | 'telegram' | 'text';
    value: string;
  };
  requireAccessCode: boolean;
  accessCodeExpiration: number;
}

export const BotConfigForm = () => {
  const form = useForm<BotConfigFormValues>({
    initialValues: {
      welcomeMessage: '',
      bannerImage: '',
      orderButton: {
        type: 'telegram',
        value: ''
      },
      requireAccessCode: false,
      accessCodeExpiration: 24
    },
    validate: {
      welcomeMessage: (value) => (!value ? 'Message requis' : null),
      orderButton: {
        value: (value) => (!value ? 'Valeur requise' : null)
      }
    }
  });

  const handleSubmit = async (values: BotConfigFormValues) => {
    try {
      await api.put('/bot-config', values);
      // Afficher une notification de succès
    } catch (error) {
      // Afficher une notification d'erreur
      console.error('Failed to update bot config:', error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack spacing="md">
        <Textarea
          label="Message de bienvenue"
          placeholder="Entrez le message de bienvenue..."
          minRows={3}
          {...form.getInputProps('welcomeMessage')}
        />

        <MediaUploader
          onUpload={async (files) => {
            if (files.length > 0) {
              try {
                const formData = new FormData();
                formData.append('file', files[0]);
                const response = await api.post('/media/upload', formData);
                form.setFieldValue('bannerImage', response.fileId);
              } catch (error) {
                console.error('Failed to upload banner:', error);
              }
            }
          }}
        />

        <Select
          label="Type de bouton de commande"
          data={[
            { value: 'telegram', label: 'Chat Telegram' },
            { value: 'url', label: 'Lien externe' },
            { value: 'text', label: 'Texte simple' }
          ]}
          {...form.getInputProps('orderButton.type')}
        />

        <TextInput
          label="Valeur du bouton"
          placeholder="@username ou https://..."
          {...form.getInputProps('orderButton.value')}
        />

        <Switch
          label="Nécessite un code d'accès"
          {...form.getInputProps('requireAccessCode', { type: 'checkbox' })}
        />

        {form.values.requireAccessCode && (
          <TextInput
            type="number"
            label="Expiration des codes (heures)"
            {...form.getInputProps('accessCodeExpiration')}
          />
        )}

        <Button type="submit">Enregistrer les modifications</Button>
      </Stack>
    </form>
  );
};