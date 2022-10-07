import React from 'react';
import '../static/css/blog.css';
import Box from '@mui/material/Box';
import Thumbnail from '../components/blog/Thumbnail';

function Blog() {
  return (
    <div id="main_container_blog">
      <div className="blog_header">
        <span>Blog</span>
      </div>
      <Box
        style={{ background: 'white', minHeight: '800px', paddingTop: '80px' }}
        sx={{
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
        }}
        spacing="sm"
      >
        <Thumbnail />
        <Thumbnail />
        <Thumbnail />
        <Thumbnail />
      </Box>
    </div>
  );
}

export default Blog;
