import React, { useState } from 'react';
import { IQuoteForm } from '../../types';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  TextField,
  Typography
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { TextareaAutosize } from '@mui/material';
import axiosApi from '../../axiosAPI.ts';

const initialForm = {
  category: '',
  author: '',
  text: '',
}
const QuoteForm = () => {
  const [form, setForm] = useState<IQuoteForm>({...initialForm});

  const quoteCategories = [
    {title: 'Star Wars', id: 'star-wars'},
    {title: 'Famous people', id: 'famous-people'},
    {title: 'Saying', id: 'saying'},
    {title: 'Humour', id: 'humour'},
    {title: 'Motivational', id: 'motivational'},
  ]

  const onChangeQuoteField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axiosApi.post('quotes.json', form);
    // console.log(form);

    setForm({...initialForm});
  };

  return (
    <form onSubmit={onSubmitForm}>
      <Typography color="inherit" to="/new-quote" variant="h4" component="div" sx={{flexGrow: 1, textDecoration: "none", mb: 4}}>
        Submit new quote
      </Typography>
      <Box sx={{ maxWidth: 300, mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={form.category}
            label="Category"
            name="category"
            onChange={onChangeQuoteField}
          >
            {quoteCategories.map((quoteCategory) => (
              <MenuItem key={quoteCategory.id} value={quoteCategory.id}>{quoteCategory.title}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={2} sx={{ me: "auto", width: "70%"}}>
        <Grid size={12}>
          <TextField
            sx={{ width: "100%"}}
            id="outlined-basic"
            label="Author"
            name="author"
            variant="outlined"
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
            onChange={onChangeQuoteField}
          />
        </Grid>
      </Grid>
      <Grid size={8}>
        <Button type="submit" variant="contained">Save</Button>
      </Grid>
    </form>
  );
};

export default QuoteForm;