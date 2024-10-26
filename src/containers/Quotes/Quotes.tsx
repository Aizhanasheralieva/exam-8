import { IQuote, IQuoteAPI } from '../../types';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { NavLink, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import axiosApi from '../../axiosAPI.ts';

interface Props {
  deleteQuote: (id: string) => void;
}
const Quotes: React.FC<Props> = ({deleteQuote}) => {
  const [quotes, setQuotes] = useState<IQuote[]>([]);
  const { categoryId } = useParams<{ categoryId: string }>();

  const fetchData = useCallback(async () => {
    if (categoryId){
      try {
        const response = await axiosApi<IQuoteAPI>(`quotes.json?orderBy="category"&equalTo="${categoryId}"`);
        if (response.data) {
          const quotesFromAPI = Object.keys(response.data).map(quoteKey => {
            return {
              id: quoteKey,
              ...response.data[quoteKey],
            };
          });
          setQuotes(quotesFromAPI);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await axiosApi.get("/quotes.json");
        if (response.data) {
          const quotesFromAPI = Object.keys(response.data).map(quoteKey => {
            return {
              id: quoteKey,
              ...response.data[quoteKey],
            };
          });
          setQuotes(quotesFromAPI);
        }
      } catch (error) {
        console.error(error);
      }
    }

  }, []);

  useEffect(() => {
    void fetchData();
  }, [categoryId]);

  return (
    <>
      {quotes.length === 0 ? <p>There are any quotes</p> :
        <>
          <Typography variant="h4" component="h1" sx={{flexGrow: 1, mb: 4}}>
            All Quotes
          </Typography>
          {quotes.map((quote) =>
            (
              <Card key={quote.id} sx={{ minWidth: 275, mb: 2 }}>
                <CardContent>
                  <Typography variant="body2" sx={{fontSize: 20 }}>
                    {quote.text}
                  </Typography>
                  <Typography gutterBottom>
                    - {quote.author}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" component={NavLink} to={`/quotes/${quote.id}/edit`}>Edit</Button>
                  <Button size="small" component={NavLink} onClick={() => deleteQuote(quote.id)}>Delete</Button>
                </CardActions>
              </Card>
            ))}
        </>
      }
    </>
  );
};

export default Quotes;