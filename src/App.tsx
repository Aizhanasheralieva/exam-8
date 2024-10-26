import Navbar from './components/Navbar/Navbar.tsx';
import { Container, Typography } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Quotes from './containers/Quotes/Quotes.tsx';
import QuoteForm from './containers/QuoteForm/QuoteForm.tsx';
import NewQuote from './containers/NewQuote/NewQuote.tsx';
import EditQuote from './containers/EditQuote/EditQuote.tsx';

const App = () => (
  <>
    <header>
      <Navbar />
    </header>
    <Container maxWidth="lg">
      <Routes>
        <Route path="/" element={<Quotes/>}></Route>
        <Route path="/quotes" element={<Quotes/>}></Route>
        <Route path="/quotes/new-quote" element={<QuoteForm/>}></Route>
        <Route path="/quotes/:idQuote/edit" element={<EditQuote/>}></Route>
        <Route path="*" element={<Typography variant="h6">Page not found</Typography>}></Route>
      </Routes>
    </Container>

  </>
);

export default App;
