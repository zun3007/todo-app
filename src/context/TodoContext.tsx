import { createContext, useContext, useReducer, useEffect } from 'react';
import { TodoState, TodoAction } from '../types';

const TodoContext = createContext<{
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
} | null>(null);

const STORAGE_KEY = 'todo_app_state';

// Load initial state from localStorage or use default
const loadInitialState = (): TodoState => {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
  }
  return { categories: [] };
};

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [
          ...state.categories,
          { ...action.payload, id: crypto.randomUUID(), tasks: [] },
        ],
      };

    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter((cat) => cat.id !== action.payload),
      };

    case 'ADD_TASK':
      return {
        ...state,
        categories: state.categories.map((cat) =>
          cat.id === action.payload.categoryId
            ? {
                ...cat,
                tasks: [
                  ...cat.tasks,
                  {
                    id: crypto.randomUUID(),
                    title: action.payload.title,
                    completed: false,
                    canceled: false,
                    status: 'draft',
                  },
                ],
              }
            : cat
        ),
      };

    case 'DELETE_TASK':
      return {
        ...state,
        categories: state.categories.map((cat) =>
          cat.id === action.payload.categoryId
            ? {
                ...cat,
                tasks: cat.tasks.filter(
                  (task) => task.id !== action.payload.taskId
                ),
              }
            : cat
        ),
      };

    case 'TOGGLE_TASK':
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.payload.categoryId
            ? {
                ...category,
                tasks: category.tasks.map((task) =>
                  task.id === action.payload.taskId
                    ? {
                        ...task,
                        completed: !task.completed,
                        status: !task.completed ? 'completed' : 'draft',
                      }
                    : task
                ),
              }
            : category
        ),
      };

    case 'EDIT_TASK':
      return {
        ...state,
        categories: state.categories.map((cat) =>
          cat.id === action.payload.categoryId
            ? {
                ...cat,
                tasks: cat.tasks.map((task) =>
                  task.id === action.payload.taskId
                    ? { ...task, title: action.payload.title }
                    : task
                ),
              }
            : cat
        ),
      };

    case 'CANCEL_TASK':
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.payload.categoryId
            ? {
                ...category,
                tasks: category.tasks.map((task) => {
                  if (task.id === action.payload.taskId) {
                    const newCanceledState = !task.canceled;
                    return { ...task, canceled: newCanceledState };
                  }
                  return task;
                }),
                canceledTasks: category.tasks.find(t => t.id === action.payload.taskId)?.canceled
                  ? category.canceledTasks - 1  // If it was canceled, decrease counter
                  : category.canceledTasks + 1  // If it wasn't canceled, increase counter
              }
            : category
        ),
      };

    case 'SET_TASK_STATUS':
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.payload.categoryId
            ? {
                ...category,
                tasks: category.tasks.map((task) =>
                  task.id === action.payload.taskId
                    ? { ...task, status: action.payload.status }
                    : task
                ),
              }
            : category
        ),
      };

    default:
      return state;
  }
}

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, loadInitialState());

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving state to localStorage:', error);
    }
  }, [state]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
}
