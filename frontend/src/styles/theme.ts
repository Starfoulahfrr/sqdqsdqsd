import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  colorScheme: 'dark',
  primaryColor: 'blue',
  components: {
    Button: {
      styles: (theme) => ({
        root: {
          '&:not(:disabled):hover': {
            backgroundColor: theme.fn.darken(theme.colors.blue[6], 0.05),
          },
        },
      }),
    },
    Card: {
      styles: (theme) => ({
        root: {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        },
      }),
    },
  },
};