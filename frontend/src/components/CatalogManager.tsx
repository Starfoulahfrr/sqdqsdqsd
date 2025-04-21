import { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Button, Group, Text } from '@mantine/core';
import { CategoryCard } from './CategoryCard';
import { AddCategoryModal } from './AddCategoryModal';
import { useCatalogStore } from '../store/catalogStore';

export const CatalogManager = () => {
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const { categories, isLoading } = useCatalogStore();

  const handleDragEnd = (result) => {
    // Implémentation du drag & drop
  };

  return (
    <>
      <Group position="apart" mb="md">
        <Text size="xl">Gestion du Catalogue</Text>
        <Button onClick={() => setIsAddingCategory(true)}>
          Ajouter une catégorie
        </Button>
      </Group>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="categories">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {categories.map((category, index) => (
                <CategoryCard 
                  key={category.id} 
                  category={category} 
                  index={index} 
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <AddCategoryModal
        opened={isAddingCategory}
        onClose={() => setIsAddingCategory(false)}
      />
    </>
  );
};