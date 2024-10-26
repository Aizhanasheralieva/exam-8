import Navbar from './components/Navbar/Navbar.tsx';
import { Container, Typography } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Quotes from './containers/Quotes/Quotes.tsx';
import QuoteForm from './containers/QuoteForm/QuoteForm.tsx';

const App = () => (
  <>
    <header>
      <Navbar />
    </header>
    <Container maxWidth="lg">
      <Routes>
        <Route path="/quotes" element={<Quotes/>}></Route>
        <Route path="/new-quote" element={<QuoteForm/>}></Route>
        <Route path="*" element={<Typography variant="h6">Page not found</Typography>}></Route>
      </Routes>
    </Container>

  </>
);

export default App;
