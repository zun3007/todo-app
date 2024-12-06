import { Paper, Typography, Box } from '@mui/material';
import { ReactNode } from 'react';

interface StatusCardProps {
  title: string;
  count: number;
  icon: ReactNode;
  color: string;
}

export const StatusCard = ({ title, count, icon, color }: StatusCardProps) => (
  <Paper
    sx={{
      p: 2,
      display: 'flex',
      alignItems: 'center',
      bgcolor: color,
      color: 'white',
      borderRadius: 2,
    }}
  >
    <Box sx={{ mr: 2 }}>{icon}</Box>
    <Box>
      <Typography variant='h6'>{title}</Typography>
      <Typography>{count} Tasks</Typography>
    </Box>
  </Paper>
);
