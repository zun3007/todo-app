import { useState } from 'react';
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTodo } from '../context/TodoContext';

const AddProjectButton = () => {
  const { dispatch } = useTodo();
  const [open, setOpen] = useState(false);
  const [categoryData, setCategoryData] = useState({
    name: '',
    description: '',
    canceledTasks: 0,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCategoryData({ name: '', description: '', canceledTasks: 0 });
  };

  const handleSubmit = () => {
    if (categoryData.name.trim()) {
      dispatch({
        type: 'ADD_CATEGORY',
        payload: {
          name: categoryData.name,
          description: categoryData.description,
          canceledTasks: categoryData.canceledTasks,
        },
      });
      handleClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Fab
        color='primary'
        aria-label='add category'
        onClick={handleOpen}
        sx={{
          position: 'fixed',
          bottom: 16,
          left: 16,
        }}
      >
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            name='name'
            label='Category Name'
            type='text'
            fullWidth
            variant='outlined'
            value={categoryData.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin='dense'
            name='description'
            label='Category Description'
            type='text'
            fullWidth
            variant='outlined'
            multiline
            rows={3}
            value={categoryData.description}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant='contained'
            disabled={!categoryData.name.trim()}
          >
            Add Category
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddProjectButton;
