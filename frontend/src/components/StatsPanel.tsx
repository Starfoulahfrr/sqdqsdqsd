import { Grid, Card, Text, RingProgress, Group } from '@mantine/core';
import { useState, useEffect } from 'react';
import { api } from '../utils/api';

interface Stats {
  totalUsers: number;
  activeUsers: number;
  totalProducts: number;
  totalCategories: number;
  accessCodeUsage: number;
  accessCodeTotal: number;
}

export const StatsPanel = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.get('/stats');
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (!stats) return <div>Erreur de chargement des statistiques</div>;

  return (
    <Grid>
      <Grid.Col span={4}>
        <Card withBorder p="xl">
          <Group position="apart">
            <Text size="xs" color="dimmed" transform="uppercase" weight={700}>
              Utilisateurs actifs
            </Text>
          </Group>
          <Group align="center" mt="lg">
            <RingProgress
              size={80}
              roundCaps
              thickness={8}
              sections={[
                {
                  value: (stats.activeUsers / stats.totalUsers) * 100,
                  color: 'blue'
                }
              ]}
            />
            <div>
              <Text weight={700} size="xl">
                {stats.activeUsers}
              </Text>
              <Text size="sm" color="dimmed">
                sur {stats.totalUsers} utilisateurs
              </Text>
            </div>
          </Group>
        </Card>
      </Grid.Col>

      <Grid.Col span={4}>
        <Card withBorder p="xl">
          <Text size="xs" color="dimmed" transform="uppercase" weight={700}>
            Catalogue
          </Text>
          <Text weight={700} size="xl" mt="lg">
            {stats.totalProducts}
          </Text>
          <Text size="sm" color="dimmed">
            produits dans {stats.totalCategories} catégories
          </Text>
        </Card>
      </Grid.Col>

      <Grid.Col span={4}>
        <Card withBorder p="xl">
          <Text size="xs" color="dimmed" transform="uppercase" weight={700}>
            Utilisation des codes
          </Text>
          <Text weight={700} size="xl" mt="lg">
            {stats.accessCodeUsage}
          </Text>
          <Text size="sm" color="dimmed">
            codes utilisés sur {stats.accessCodeTotal}
          </Text>
        </Card>
      </Grid.Col>
    </Grid>
  );
};