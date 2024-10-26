import React from 'react';
import { IQuoteForm } from '../../types';
import QuoteForm from '../QuoteForm/QuoteForm.tsx';
import axiosApi from '../../axiosAPI.ts';
import axiosAPI from '../../axiosAPI.ts';

const NewQuote = () => {
  const submitForm = async (quote: IQuoteForm) => {
    try {
      await axiosAPI.post('quotes.json', {...quote});
      console.log('Quote saved:', quote);
    } catch (e) {
      console.error('Error saving quote:', e);
    }
  };

  return (
    <div>
      <QuoteForm submitForm={submitForm} />
    </div>
  );
};

export default NewQuote;
