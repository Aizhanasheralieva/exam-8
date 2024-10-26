import React, { useCallback, useEffect, useState } from 'react';
import QuoteForm from '../QuoteForm/QuoteForm.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { IQuote, IQuoteAPI, IQuoteForm } from '../../types';
import axiosApi from '../../axiosAPI.ts';
import axiosAPI from '../../axiosAPI.ts';

const EditQuote = () => {
  const [quote, setQuote] =useState<IQuote>();
  const params = useParams<{idQuote: string}>();
  const navigate = useNavigate();

  const fetchOneQuote = useCallback(async () => {
    const response: {data} = await axiosApi<IQuote>(`quotes/${params.idQuote}.json`);
    if (response.data) {
      setQuote(response.data);
    }
  }, [params.idQuote]);

  const submitForm = async (quote: IQuoteForm) => {
    await axiosApi.put(`quotes/${params.idQuote}.json`, quote);
    navigate('/quotes');
  }

  useEffect(() => {
    if (params.idQuote) {
      void fetchOneQuote();
    }
  }, [params.idQuote, fetchOneQuote]);

  const deleteQuote = async () => {
    try {
      if (params.idQuote) {
        await axiosAPI.delete(`quotes/${params.idQuote}.json`);
        navigate('/quotes');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <QuoteForm quoteForEditing={quote} submitForm={submitForm} />
    </div>
  );
};

export default EditQuote;