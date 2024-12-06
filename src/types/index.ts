export interface Task {
  id: string;
  title: string;
  completed: boolean;
  canceled?: boolean;
  status: 'draft' | 'in-progress' | 'completed' | 'canceled';
}

export interface Category {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
  canceledTasks: number;
}

export interface TodoState {
  categories: Category[];
}

export type TodoAction =
  | { type: 'ADD_CATEGORY'; payload: Omit<Category, 'id' | 'tasks'> }
  | { type: 'DELETE_CATEGORY'; payload: string }
  | { type: 'ADD_TASK'; payload: { categoryId: string; title: string } }
  | { type: 'DELETE_TASK'; payload: { categoryId: string; taskId: string } }
  | { type: 'TOGGLE_TASK'; payload: { categoryId: string; taskId: string } }
  | {
      type: 'EDIT_TASK';
      payload: { categoryId: string; taskId: string; title: string };
    }
  | { type: 'CANCEL_TASK'; payload: { categoryId: string; taskId: string } }
  | { type: 'SET_TASK_STATUS'; payload: { categoryId: string; taskId: string; status: Task['status'] } };
