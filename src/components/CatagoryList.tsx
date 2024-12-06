import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  List,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { alpha } from '@mui/material/styles';
import { useTodo } from '../context/TodoContext';
import { TaskStatsBadges } from './TaskStatsBadges';
import { TaskProgressCircle } from './TaskProgressCircle';
import { TaskItem } from './TaskItem';
import { useCategoryProgress } from '../hooks/useCategoryProgress';
import { useTaskActions } from '../hooks/useTaskActions';
import { useTaskDialog } from '../hooks/useTaskDialog';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

export default function CategoryList() {
  const { state } = useTodo();
  const { calculateProgress } = useCategoryProgress();
  const taskActions = useTaskActions();
  const {
    openTaskDialog,
    newTaskTitle,
    editingTask,
    setNewTaskTitle,
    handleOpenTaskDialog,
    handleOpenEditDialog,
    handleCloseTaskDialog,
    handleSaveTask,
  } = useTaskDialog();

  return (
    <Box component='section' aria-labelledby='category-list-title'>
      <Typography
        variant='h5'
        component='h2'
        id='category-list-title'
        sx={{
          mb: 4,
          fontWeight: 700,
          color: 'text.primary',
          fontSize: '1.75rem',
        }}
      >
        Categories & Tasks
      </Typography>

      {state.categories.map((category) => (
        <Accordion
          key={category.id}
          sx={{
            mb: 2.5,
            '&:before': { display: 'none' },
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            borderRadius: '12px !important',
            border: '1px solid',
            borderColor: 'divider',
            '&:hover': {
              borderColor: 'primary.main',
              boxShadow: (theme) =>
                `0 4px 12px ${alpha(theme.palette.primary.main, 0.08)}`,
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${category.id}-content`}
            id={`${category.id}-header`}
            sx={{
              '&.Mui-expanded': {
                minHeight: '48px',
                borderBottom: '1px solid',
                borderColor: 'divider',
              },
              py: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant='h6'
                  component='h3'
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    mb: 1,
                    fontSize: '1.1rem',
                  }}
                >
                  {category.name}
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ mb: 1.5 }}
                >
                  {category.description}
                </Typography>
                <TaskStatsBadges category={category} />
              </Box>
              <Box sx={{ pr: 1 }}>
                <TaskProgressCircle progress={calculateProgress(category)} />
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 3 }}>
            <List sx={{ p: 0 }}>
              {category.tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  categoryId={category.id}
                  onToggle={taskActions.toggle}
                  onEdit={handleOpenEditDialog}
                  onCancel={taskActions.cancel}
                  onDelete={taskActions.delete}
                  onSetStatus={taskActions.setStatus}
                />
              ))}
            </List>
            <Button
              startIcon={<AddIcon />}
              variant='contained'
              sx={{
                mt: 3,
                borderRadius: '8px',
                textTransform: 'none',
                boxShadow: 'none',
                px: 3,
                py: 1,
                fontWeight: 500,
                '&:hover': {
                  boxShadow: 'none',
                  backgroundColor: 'primary.dark',
                },
              }}
              onClick={() => handleOpenTaskDialog(category.id)}
            >
              Add Task
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}

      <Dialog
        open={openTaskDialog}
        onClose={handleCloseTaskDialog}
        maxWidth='sm'
        fullWidth
        aria-labelledby='task-dialog-title'
      >
        <DialogTitle id='task-dialog-title'>
          {editingTask ? 'Edit Task' : 'Add New Task'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            label='Task Title'
            type='text'
            fullWidth
            variant='outlined'
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={handleCloseTaskDialog}
            variant='outlined'
            startIcon={<DoDisturbIcon />}
            sx={{ textTransform: 'none', borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveTask}
            variant='contained'
            disabled={!newTaskTitle.trim()}
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              boxShadow: 'none',
              '&:hover': { boxShadow: 'none' },
            }}
          >
            {editingTask ? 'Save Changes' : 'Add Task'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
