import { Box, Container } from '@mui/material';
import AnalysisSection from './components/AnalysisSection';
import CatagoryList from './components/CatagoryList';
import AddCategoryButton from './components/AddCategoryButton';

export default function App() {
  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <AnalysisSection />
      </Box>
      <Box sx={{ mb: 4 }}>
        <CatagoryList />
      </Box>
      <AddCategoryButton />
    </Container>
  );
}
