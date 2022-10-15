import React from 'react';
import '../static/css/blog.css';
import Box from '@mui/material/Box';
import Thumbnail from '../components/blog/Thumbnail';
import useAxios from '../hooks/useAxios';
import axiosInstance from '../api/api_main_config';
import { useEffect } from 'react';

function Blog() {
  // eslint-disable-next-line no-unused-vars
  const [blogs, error, loading, refetch] = useAxios({
    axiosInstance: axiosInstance,
    method: 'GET',
    url: '/blog',
  });

  const renderBlogShorts = () => {
    if (blogs.results === undefined){
      return (<h1>There is no posts to display</h1>)
    }
    else {
      return(
        blogs.results.map((blog) => (
          <Thumbnail
          tag={blog.tag}
          date={blog.last_update}
          title={blog.title}
          short={blog.short}
          />
        ))
      );
    }
  }
  
  return (
    <div>
    <div id="main_container_blog">
      <div className="blog_header">
        <span>Blog</span>
      </div>
      <div
        style={{ background: 'white' }}
      >
        <Box
          style={{
            minHeight: '800px', paddingTop: '80px'
          }}
          sx={{
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
          }}
          spacing="sm"
        >
          {renderBlogShorts()}
        </Box>
      </div>
    </div>
    </div>
  );
}

export default Blog;
