import { Box, CircularProgress, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

interface TaskProgressCircleProps {
  progress: number;
}

export const TaskProgressCircle = ({ progress }: TaskProgressCircleProps) => (
  <Box sx={{ position: 'relative', display: 'inline-flex' }}>
    <CircularProgress
      variant='determinate'
      value={progress}
      size={40}
      thickness={4}
      sx={{
        color: (theme) =>
          progress === 100
            ? theme.palette.success.main
            : theme.palette.primary.main,
        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
        borderRadius: '50%',
      }}
    />
    <Box
      sx={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography
        variant='caption'
        sx={{
          fontWeight: 600,
          fontSize: '0.75rem',
        }}
      >
        {progress}%
      </Typography>
    </Box>
  </Box>
);
