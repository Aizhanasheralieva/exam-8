import React, { useCallback, useEffect, useState } from 'react';
import axiosApi from '../../axiosAPI.ts';
import { IQuote, IQuoteAPI } from '../../types';

const Quotes = () => {
const [quotes, setQuotes] = useState<IQuote[]>([]);

  const fetchData = useCallback(async () => {

    const response: {data} = await axiosApi<IQuoteAPI>('quotes.json');
    console.log(response.data);
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);
  return (
    <div>
      Quotes
    </div>
  );
};

export default Quotes;