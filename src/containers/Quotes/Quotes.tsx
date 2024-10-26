import React, { useCallback, useEffect, useState } from 'react';
import axiosApi from '../../axiosAPI.ts';
import { IQuote, IQuoteAPI } from '../../types';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Quotes = () => {
const [quotes, setQuotes] = useState<IQuote[]>([]);

  const fetchData = useCallback(async () => {

    const response: {data} = await axiosApi<IQuoteAPI>('quotes.json');

    if (response.data) {
      const quotesFromAPI = Object.keys(response.data).map(quoteKey => {
        return {
          id: quoteKey,
          ...response.data[quoteKey],
        };
      });
      setQuotes(quotesFromAPI);
      // console.log(quotesFromAPI)
    }
    console.log(response.data);
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

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
              </CardActions>
            </Card>
          ))}
      </>
      }
    </>
  );
};

export default Quotes;