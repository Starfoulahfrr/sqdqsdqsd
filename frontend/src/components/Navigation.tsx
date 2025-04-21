import { Navbar, UnstyledButton, Group, Text } from '@mantine/core';
import { 
  IconLayoutDashboard, 
  IconSettings, 
  IconShoppingCart,
  IconChartBar,
  IconUsers
} from '@tabler/icons-react';

interface NavigationProps {
  active: string;
  onNavigate: (section: string) => void;
}

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: IconLayoutDashboard },
  { id: 'catalog', label: 'Catalogue', icon: IconShoppingCart },
  { id: 'stats', label: 'Statistiques', icon: IconChartBar },
  { id: 'access', label: 'Codes d\'accès', icon: IconUsers },
  { id: 'settings', label: 'Paramètres', icon: IconSettings }
];

export const Navigation = ({ active, onNavigate }: NavigationProps) => {
  return (
    <Navbar.Section grow>
      {NAV_ITEMS.map((item) => (
        <UnstyledButton
          key={item.id}
          onClick={() => onNavigate(item.id)}
          sx={(theme) => ({
            display: 'block',
            width: '100%',
            padding: theme.spacing.xs,
            borderRadius: theme.radius.sm,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
            backgroundColor: active === item.id 
              ? theme.colorScheme === 'dark' 
                ? theme.colors.dark[6] 
                : theme.colors.gray[1]
              : 'transparent',
            '&:hover': {
              backgroundColor: theme.colorScheme === 'dark' 
                ? theme.colors.dark[6] 
                : theme.colors.gray[1]
            }
          })}
        >
          <Group>
            <item.icon size={20} />
            <Text>{item.label}</Text>
          </Group>
        </UnstyledButton>
      ))}
    </Navbar.Section>
  );
};