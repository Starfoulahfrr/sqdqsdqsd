import { Stack, Title, Card } from '@mantine/core';
import { BotConfigForm } from '../components/BotConfigForm';
import { AccessCodeManager } from '../components/AccessCodeManager';
import { CustomButtonsManager } from '../components/CustomButtonsManager';

export const Settings = () => {
  return (
    <Stack spacing="xl">
      <Title order={2}>Paramètres du Bot</Title>

      <Card withBorder>
        <Title order={3} mb="md">Configuration Générale</Title>
        <BotConfigForm />
      </Card>

      <Card withBorder>
        <Title order={3} mb="md">Codes d'Accès</Title>
        <AccessCodeManager />
      </Card>

      <Card withBorder>
        <Title order={3} mb="md">Boutons Personnalisés</Title>
        <CustomButtonsManager />
      </Card>
    </Stack>
  );
};