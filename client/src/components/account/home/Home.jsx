import React from 'react';
import Banner from '../../banner/Banner';
import { Grid } from '@mui/material';
import Categories from '../home/Categories';
import Posts from './post/posts';

const Home = () => {
  return (
    <>
      <Banner />

      {/* Add space here */}
      <Grid container spacing={12} sx={{ mt: 2 }}>
        
        {/* Categories */}
        <Grid size={{ lg: 2, sm: 2, xs: 12 }}>
          <Categories />
        </Grid>

        {/* Posts */}
        <Grid size={{ lg: 10, sm: 10, xs: 12 }}>
          <Posts />
        </Grid>

      </Grid>
    </>
  );
};

export default Home;