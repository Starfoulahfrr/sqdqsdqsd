import { useState } from 'react';
import { Card, Text, Button, Group, Menu } from '@mantine/core';
import { Draggable } from 'react-beautiful-dnd';
import { Category } from '../types';
import { ProductCard } from './ProductCard';
import { ProductForm } from './ProductForm';

interface CategoryCardProps {
  category: Category;
  index: number;
}

export const CategoryCard = ({ category, index }: CategoryCardProps) => {
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Draggable draggableId={category.id} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          withBorder
          mb="md"
        >
          <Card.Section p="md" {...provided.dragHandleProps}>
            <Group position="apart">
              <Text size="lg" weight={500}>
                {category.name}
              </Text>
              <Menu>
                <Menu.Item onClick={() => setIsEditing(true)}>
                  Modifier la catégorie
                </Menu.Item>
                <Menu.Item color="red">
                  Supprimer la catégorie
                </Menu.Item>
              </Menu>
            </Group>
          </Card.Section>

          {category.products.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              index={idx}
              categoryId={category.id}
            />
          ))}

          <Button
            variant="light"
            fullWidth
            mt="md"
            onClick={() => setIsAddingProduct(true)}
          >
            Ajouter un produit
          </Button>

          {isAddingProduct && (
            <ProductForm
              onSubmit={(data) => {
                // Logique d'ajout du produit
                setIsAddingProduct(false);
              }}
              onCancel={() => setIsAddingProduct(false)}
            />
          )}
        </Card>
      )}
    </Draggable>
  );
};