import { useTodo } from '../context/TodoContext';
import { Task } from '../types';

export const useTaskActions = () => {
  const { dispatch } = useTodo();

  const handleCancelTask = (categoryId: string, taskId: string) => {
    dispatch({
      type: 'CANCEL_TASK',
      payload: { categoryId, taskId },
    });
  };

  return {
    toggle: (categoryId: string, taskId: string) => {
      dispatch({
        type: 'TOGGLE_TASK',
        payload: { categoryId, taskId },
      });
    },
    cancel: handleCancelTask,
    delete: (categoryId: string, taskId: string) => {
      dispatch({
        type: 'DELETE_TASK',
        payload: { categoryId, taskId },
      });
    },
    setStatus: (categoryId: string, taskId: string, status: Task['status']) => {
      dispatch({
        type: 'SET_TASK_STATUS',
        payload: { categoryId, taskId, status },
      });
    },
  };
};
