import React, { useEffect, useState } from 'react';
import {List, ListItem, ListItemText, Typography} from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import axiosApi from '../../axiosAPI.ts';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosApi.get(`quotes.json?orderBy="category"&equalTo="${categoryId}"`);
        if (response.data) {
          const categoriesFromAPI = Object.keys(response.data).map(categoryKey => ({
            id: categoryKey,
            ...response.data[categoryKey],
          }));
          setCategories(categoriesFromAPI);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

   void fetchCategories();
  }, []);

    return (
        <div>
            <Typography variant="h5">Categories</Typography>
            <List>
                {categories.map(category => (
                    <ListItem button key={category.id} onClick={() => navigate(`/category/${category.id}`)}>
                        <ListItemText primary={category.title} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

};

export default CategoryList;