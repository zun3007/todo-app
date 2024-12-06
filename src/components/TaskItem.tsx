import { ListItem, ListItemText, Box, IconButton, Tooltip } from '@mui/material';
import { alpha } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  categoryId: string;
  onToggle: (categoryId: string, taskId: string) => void;
  onEdit: (categoryId: string, taskId: string, title: string) => void;
  onCancel: (categoryId: string, taskId: string) => void;
  onDelete: (categoryId: string, taskId: string) => void;
  onSetStatus: (categoryId: string, taskId: string, status: Task['status']) => void;
}

export const TaskItem = ({
  task,
  categoryId,
  onToggle,
  onEdit,
  onCancel,
  onDelete,
  onSetStatus,
}: TaskItemProps) => {
  const handleStatusClick = () => {
    if (task.status === 'draft') {
      onSetStatus(categoryId, task.id, 'in-progress');
    } else if (task.status === 'in-progress') {
      onSetStatus(categoryId, task.id, 'draft');
    }
  };

  return (
    <ListItem
      sx={{
        borderRadius: '8px',
        mb: 1,
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': {
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.02),
          borderColor: 'primary.main',
        },
        transition: 'all 0.2s ease-in-out',
      }}
      secondaryAction={
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {!task.completed && !task.canceled && (
            <Tooltip 
              title={task.status === 'in-progress' ? 'Set as Draft' : 'Set In Progress'}
            >
              <IconButton
                size='small'
                onClick={handleStatusClick}
                sx={{
                  color: task.status === 'in-progress' ? 'warning.main' : 'action.active',
                  '&:hover': {
                    backgroundColor: (theme) => 
                      alpha(theme.palette.warning.main, 0.08),
                  },
                }}
              >
                {task.status === 'in-progress' ? (
                  <PauseIcon fontSize='small' />
                ) : (
                  <PlayArrowIcon fontSize='small' />
                )}
              </IconButton>
            </Tooltip>
          )}
          <IconButton
            size='small'
            aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
            onClick={() => onToggle(categoryId, task.id)}
            disabled={task.canceled || task.status === 'draft'}
            sx={{
              color: task.completed ? 'success.main' : 'action.active',
              '&:hover': {
                backgroundColor: (theme) => alpha(theme.palette.success.main, 0.08),
              },
              '&.Mui-disabled': {
                opacity: 0.5,
              },
            }}
          >
            {task.completed ? (
              <CheckCircleIcon fontSize='small' />
            ) : (
              <CheckCircleOutlineIcon fontSize='small' />
            )}
          </IconButton>
          <IconButton
            size='small'
            aria-label={task.canceled ? 'Uncancel task' : 'Cancel task'}
            onClick={() => onCancel(categoryId, task.id)}
            disabled={task.completed}
            sx={{
              color: task.canceled ? 'error.main' : 'action.active',
              '&:hover': {
                backgroundColor: (theme) => alpha(theme.palette.error.main, 0.08),
              },
              '&.Mui-disabled': {
                opacity: 0.5,
              },
            }}
          >
            {task.canceled ? (
              <DoDisturbOnIcon fontSize='small' />
            ) : (
              <DoDisturbIcon fontSize='small' />
            )}
          </IconButton>
          {!task.completed && !task.canceled && (
            <IconButton
              size='small'
              aria-label='Edit task'
              onClick={() => onEdit(categoryId, task.id, task.title)}
              sx={{
                '&:hover': {
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              <EditIcon fontSize='small' />
            </IconButton>
          )}
          <IconButton
            size='small'
            aria-label='Delete task'
            onClick={() => onDelete(categoryId, task.id)}
            sx={{
              '&:hover': {
                backgroundColor: (theme) => alpha(theme.palette.error.main, 0.08),
              },
            }}
          >
            <DeleteIcon fontSize='small' />
          </IconButton>
        </Box>
      }
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {task.status === 'in-progress' && (
          <PlayArrowIcon
            fontSize='small'
            sx={{ color: 'warning.main', opacity: 0.7 }}
          />
        )}
        {task.completed && (
          <CheckCircleIcon
            fontSize='small'
            sx={{ color: 'success.main', opacity: 0.7 }}
          />
        )}
        {task.canceled && (
          <DoDisturbOnIcon
            fontSize='small'
            sx={{ color: 'error.main', opacity: 0.7 }}
          />
        )}
        <ListItemText
          primary={task.title}
          sx={{
            textDecoration: task.completed || task.canceled ? 'line-through' : 'none',
            opacity: task.completed || task.canceled ? 0.7 : 1,
            color: task.canceled 
              ? 'error.main' 
              : task.status === 'in-progress'
              ? 'warning.main'
              : 'inherit',
            '& .MuiTypography-root': {
              fontWeight: 500,
              fontSize: '0.9rem',
            },
          }}
        />
      </Box>
    </ListItem>
  );
};
