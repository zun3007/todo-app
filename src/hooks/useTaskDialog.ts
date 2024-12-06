import { useState } from 'react';
import { useTodo } from '../context/TodoContext';

interface EditingTask {
  id: string;
  categoryId: string;
  title: string;
}

export const useTaskDialog = () => {
  const { dispatch } = useTodo();
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editingTask, setEditingTask] = useState<EditingTask | null>(null);

  const handleOpenTaskDialog = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setEditingTask(null);
    setNewTaskTitle('');
    setOpenTaskDialog(true);
  };

  const handleOpenEditDialog = (
    categoryId: string,
    taskId: string,
    currentTitle: string
  ) => {
    setEditingTask({
      id: taskId,
      categoryId,
      title: currentTitle,
    });
    setNewTaskTitle(currentTitle);
    setOpenTaskDialog(true);
  };

  const handleCloseTaskDialog = () => {
    setOpenTaskDialog(false);
    setNewTaskTitle('');
    setSelectedCategoryId('');
    setEditingTask(null);
  };

  const handleSaveTask = () => {
    if (!newTaskTitle.trim()) return;

    if (editingTask) {
      dispatch({
        type: 'EDIT_TASK',
        payload: {
          categoryId: editingTask.categoryId,
          taskId: editingTask.id,
          title: newTaskTitle.trim(),
        },
      });
    } else if (selectedCategoryId) {
      dispatch({
        type: 'ADD_TASK',
        payload: {
          categoryId: selectedCategoryId,
          title: newTaskTitle.trim(),
        },
      });
    }
    handleCloseTaskDialog();
  };

  return {
    openTaskDialog,
    newTaskTitle,
    editingTask,
    setNewTaskTitle,
    handleOpenTaskDialog,
    handleOpenEditDialog,
    handleCloseTaskDialog,
    handleSaveTask,
  };
};
