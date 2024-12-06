import { Typography, Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Category } from '../types';

interface TaskStatsProps {
  category: Category;
}

interface StatBadgeProps {
  count: number;
  label: string;
  color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
}

const StatBadge = ({ count, label, color }: StatBadgeProps) => (
  <Typography
    variant='caption'
    sx={{
      backgroundColor: (theme) => alpha(theme.palette[color].main, 0.08),
      color: color === 'warning' ? 'warning.dark' : `${color}.main`,
      px: 1.5,
      py: 0.5,
      borderRadius: '16px',
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      gap: 0.5,
    }}
  >
    <span>{count}</span>
    <span style={{ opacity: 0.7 }}>{label}</span>
  </Typography>
);

export const TaskStatsBadges = ({ category }: TaskStatsProps) => {
  const getTaskStats = (category: Category) => {
    const total = category.tasks.length;
    const completed = category.tasks.filter((task) => task.completed).length;
    const active = total - completed;
    return { total, completed, active };
  };

  const stats = getTaskStats(category);

  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      <StatBadge count={stats.total} label='Total' color='info' />
      <StatBadge count={stats.completed} label='Done' color='success' />
      <StatBadge count={stats.active} label='Active' color='primary' />
      <StatBadge
        count={category.canceledTasks || 0}
        label='Canceled'
        color='warning'
      />
    </Box>
  );
};
