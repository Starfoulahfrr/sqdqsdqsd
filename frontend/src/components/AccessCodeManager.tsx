import { useState } from 'react';
import { Table, Button, TextInput, Group, Text, ActionIcon } from '@mantine/core';
import { IconTrash, IconPlus } from '@tabler/icons-react';
import { api } from '../utils/api';

interface AccessCode {
  id: string;
  code: string;
  expiresAt: string;
  usageCount: number;
  maxUsage: number;
}

export const AccessCodeManager = () => {
  const [codes, setCodes] = useState<AccessCode[]>([]);
  const [newCode, setNewCode] = useState('');
  const [maxUsage, setMaxUsage] = useState(1);

  const handleAddCode = async () => {
    try {
      const response = await api.post('/access-codes', {
        code: newCode,
        maxUsage
      });
      setCodes([...codes, response]);
      setNewCode('');
      setMaxUsage(1);
    } catch (error) {
      console.error('Failed to add access code:', error);
    }
  };

  const handleDeleteCode = async (id: string) => {
    try {
      await api.delete(`/access-codes/${id}`);
      setCodes(codes.filter(code => code.id !== id));
    } catch (error) {
      console.error('Failed to delete access code:', error);
    }
  };

  return (
    <>
      <Group mb="md">
        <TextInput
          placeholder="Code d'accès"
          value={newCode}
          onChange={(e) => setNewCode(e.target.value)}
          style={{ flex: 1 }}
        />
        <TextInput
          type="number"
          placeholder="Utilisations max"
          value={maxUsage}
          onChange={(e) => setMaxUsage(parseInt(e.target.value))}
          style={{ width: 150 }}
        />
        <Button
          leftIcon={<IconPlus size={16} />}
          onClick={handleAddCode}
          disabled={!newCode}
        >
          Ajouter
        </Button>
      </Group>

      <Table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Utilisations</th>
            <th>Expire le</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {codes.map((code) => (
            <tr key={code.id}>
              <td>{code.code}</td>
              <td>{code.usageCount} / {code.maxUsage}</td>
              <td>{new Date(code.expiresAt).toLocaleDateString()}</td>
              <td>
                <ActionIcon
                  color="red"
                  onClick={() => handleDeleteCode(code.id)}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};