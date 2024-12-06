import { useTodo } from '../context/TodoContext';

export const useTaskStats = () => {
  const { state } = useTodo();

  const stats = state.categories.reduce(
    (acc, category) => {
      category.tasks.forEach((task) => {
        if (task.canceled) {
          acc.canceled++;
        } else if (task.completed) {
          acc.completed++;
        } else if (task.status === 'in-progress') {
          acc.inProgress++;
        } else {
          // task is in draft status
          acc.draft++;
        }
      });
      return acc;
    },
    { draft: 0, inProgress: 0, completed: 0, canceled: 0 }
  );

  return stats;
};
