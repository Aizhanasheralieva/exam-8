import React, { useCallback, useEffect, useState } from 'react';
import QuoteForm from '../QuoteForm/QuoteForm.tsx';
import { useParams } from 'react-router-dom';
import { IQuote, IQuoteAPI, IQuoteForm } from '../../types';
import axiosApi from '../../axiosAPI.ts';

const EditQuote = () => {
  const [quote, setQuote] =useState<IQuote>();
  const params = useParams<{idQuote: string}>();

  const fetchOneQuote = useCallback(async () => {
    const response: {data} = await axiosApi<IQuote>(`quotes/${params.idQuote}.json`);
    if (response.data) {
      setQuote(response.data);
    }
  }, [params.idQuote]);

  const submitForm = async (quote: IQuoteForm) => {
    console.log(quote)
    await axiosApi.put(`quotes/${params.idQuote}.json`, quote);
  }

  useEffect(() => {
    if (params.idQuote) {
      void fetchOneQuote();
    }
  }, [params.idQuote, fetchOneQuote]);
  return (
    <div>
      <QuoteForm quoteForEditing={quote} submitForm={submitForm} />
    </div>
  );
};

export default EditQuote;