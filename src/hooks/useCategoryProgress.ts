import { Category } from '../types';

export const useCategoryProgress = () => {
  const calculateProgress = (category: Category) => {
    if (!category || category.tasks.length === 0) return 0;
    const completedTasks = category.tasks.filter(
      (task) => task.completed
    ).length;
    return Math.round((completedTasks / category.tasks.length) * 100);
  };

  return { calculateProgress };
};
