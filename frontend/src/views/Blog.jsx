import React, { useState, useEffect} from 'react';
import '../static/css/blog.css';
import Box from '@mui/material/Box';
import Thumbnail from '../components/blog/Thumbnail';
import useAxios from '../hooks/useAxios';
import Pagination from '@mui/material/Pagination';
import axiosInstance from '../api/api_main_config';

function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  var totalPages = 0;
  const blogsPerPage = 6;

  const [response, error, loading, refetch] = useAxios({
    axiosInstance: axiosInstance,
    method: 'GET',
    url: `/blog/?page=${currentPage}`,
  });

  const renderBlogShorts = () => {
    let blogs = response.data
    
    if (blogs === undefined){
      return (<h1>There is no posts to display</h1>)
    }
    else {
      totalPages = Math.ceil(blogs.count/blogsPerPage)
      return(
        blogs.results.map((blog) => (
          <Thumbnail
          key={blog.id}
          blog={blog}
          />
        ))
      ); 
    }
  }

  const onPageChange = (event, page) => {
    if (currentPage !== page){
      setCurrentPage(page)
      refetch()
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
        <Pagination
        size="large" 
        count={totalPages} 
        page={currentPage}
        onChange={onPageChange}
        variant="outlined"
        sx={{
          justifyContent:"center",
          display:'flex',
          marginBottom: '10px',
        }}
        />
      </div>
    </div>
    </div>
  );
}

export default Blog;
