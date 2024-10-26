import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
  Typography
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import axiosAPI from '../../axiosAPI.ts';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { IQuoteForm } from '../../types';
import axiosApi from '../../axiosAPI.ts';

const initialForm = {
  category: '',
  author: '',
  text: '',
};

const QuoteForm = () => {
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<IQuoteForm>({ ...initialForm });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getQuote = async () => {
      if (id) {
        try {
          setLoading(true);
          const response = await axiosAPI.get(`/quotes/${id}.json`);
          if (response.data) {
            setForm({ ...response.data });
          }
        } catch (error) {
          console.error('Error fetching quote:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setForm(initialForm);
      }
    };
    void getQuote();
  }, [id]);

  const quoteCategories = [
    { title: 'Star Wars', id: 'star-wars' },
    { title: 'Famous people', id: 'famous-people' },
    { title: 'Saying', id: 'saying' },
    { title: 'Humour', id: 'humour' },
    { title: 'Motivational', id: 'motivational' },
  ];

  const onChangeQuoteField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (id) {
        await axiosApi.put(`/quotes/${id}.json`, { ...form });
      } else {
        await axiosApi.post(`/quotes.json`, {
          ...form,
          date: new Date().toISOString(),
        });
      }
      setForm(initialForm);
    } catch (error) {
      console.error('Error saving quote:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitForm}>
      <Typography color="inherit" variant="h4" component="div" sx={{ flexGrow: 1, textDecoration: "none", mb: 4 }}>
        {id ? 'Edit' : 'Save new'} quote
      </Typography>
      <Box sx={{ maxWidth: 300, mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            value={form.category}
            label="Category"
            name="category"
            required
            onChange={onChangeQuoteField}
          >
            {quoteCategories.map((quoteCategory) => (
              <MenuItem key={quoteCategory.id} value={quoteCategory.id}>
                {quoteCategory.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={2} sx={{ me: "auto", width: "70%" }}>
        <Grid item xs={12}>
          <TextField
            sx={{ width: "100%" }}
            label="Author"
            name="author"
            variant="outlined"
            required
            value={form.author}
            onChange={onChangeQuoteField}
          />
        </Grid>
        <Grid item xs={12}>
          <TextareaAutosize
            minRows={7}
            style={{ width: '100%', marginBottom: '16px' }}
            placeholder="Quote text"
            name="text"
            value={form.text}
            required
            onChange={onChangeQuoteField}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? 'Saving...' : (id ? 'Edit' : 'Save')}
        </Button>
      </Grid>
    </form>
  );
};

export default QuoteForm;