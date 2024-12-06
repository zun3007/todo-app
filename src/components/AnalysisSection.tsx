import { Grid } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { StatusCard } from './StatusCard';
import { useTaskStats } from '../hooks/useTaskStats';

const ANALYSIS_CARDS = [
  {
    id: 'draft',
    title: 'Draft',
    icon: <AutorenewIcon />,
    color: '#4285F4',
  },
  {
    id: 'inProgress',
    title: 'In Progress',
    icon: <PlayArrowIcon />,
    color: '#FBBC05',
  },
  {
    id: 'completed',
    title: 'Completed',
    icon: <CheckCircleIcon />,
    color: '#34A853',
  },
  {
    id: 'canceled',
    title: 'Canceled',
    icon: <CancelIcon />,
    color: '#EA4335',
  },
] as const;

export default function AnalysisSection() {
  const stats = useTaskStats();

  return (
    <Grid container spacing={2}>
      {ANALYSIS_CARDS.map(({ id, title, icon, color }) => (
        <Grid item xs={12} sm={6} md={3} key={id}>
          <StatusCard
            title={title}
            count={stats[id]}
            icon={icon}
            color={color}
          />
        </Grid>
      ))}
    </Grid>
  );
}
