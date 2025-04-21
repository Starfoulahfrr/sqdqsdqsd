import { Group, Text, useMantineTheme } from '@mantine/core';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';

interface MediaUploaderProps {
  onUpload: (files: FileWithPath[]) => void;
}

export const MediaUploader = ({ onUpload }: MediaUploaderProps) => {
  const theme = useMantineTheme();

  return (
    <Dropzone
      onDrop={onUpload}
      maxSize={30 * 1024 ** 2} // 30MB
      accept={['image/*', 'video/*']}
    >
      <Group position="center" spacing="xl">
        <Dropzone.Accept>
          <IconUpload size={50} stroke={1.5} color={theme.colors[theme.primaryColor][4]} />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX size={50} stroke={1.5} color={theme.colors.red[6]} />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto size={50} stroke={1.5} />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Glissez des images ou vidéos ici
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            Taille maximale: 30MB
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
};