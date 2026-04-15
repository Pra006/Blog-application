import { useEffect, useState } from 'react';
import React from 'react';
import { API } from '../../../../service/api';
import { Box, Grid } from '@mui/material';
import Post from './post';
import {useSearchParams, Link} from 'react-router-dom';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
    const fetchData = async () => {
      const response = await API.getAllposts({ category: category || '' });

      if (response.isSuccess) {
        setPosts(response.data);
      }
    };

    fetchData();
  }, [category]);

  return (
    <>
      {posts && posts.length > 0 ? (
        <Grid container spacing={3} sx={{ p: 2 }}>
          {posts.map((post) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={post._id}>
              <Link to={`/details/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Post post={post} />
              </Link>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            color: '#878787',
            margin: '30px 80px',
            fontSize: 18,
          }}
        >
          No posts found
        </Box>
      )}
    </>
  );
};

export default Posts;