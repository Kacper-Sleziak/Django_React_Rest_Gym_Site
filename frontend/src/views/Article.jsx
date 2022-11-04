import React from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axiosInstance from '../api/api_main_config';
import useAxios from '../hooks/useAxios';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import '../static/css/article.css';
import Divider from '@mui/material/Divider';
import CommentSection from '../components/article/CommentsSection';

function Article(){  

    
    let { slug } = useParams();
    const serverIp = "http://127.0.0.1:8000/" 

    // articles api handler
    const [response, error, loading, refetch] = useAxios({
        axiosInstance: axiosInstance,
        method: 'GET',
        url: `/blog/${slug}`,
      });
    
      const renderBlog = () => {
        if (response === undefined){
            return(<h1>Loading...</h1>)
        }
        else{
            if (response.status !== 200) {
                return(<h1>Blog post not found</h1>)
            }
            else {
                return(
                    <Box 
                    sx={{ width: '100%', maxWidth: '70%', marginLeft: 10, marginTop: 10, marginBottom: 10}}>
                        <div>
                            <Typography variant="h2" gutterBottom>
                                {response.data.title}
                            </Typography>
        
                            <Typography variant="h5" gutterBottom>
                                {response.data.last_update}
                            </Typography>

                            <img className="article_img" src={serverIp + response.data.image} alt={response.data.title} />
             
                            <Typography 
                                variant="body1" 
                                gutterBottom
                                sx={{marginTop:5}}
                            >
                                {response.data.body}
                            </Typography>
                        </div>
                        <Divider/>
                        <Typography 
                            variant="h6" 
                            gutterBottom
                            sx={{marginTop:"5px"}}
                        >
                                Author: {response.data.author}
                            </Typography>
                        <ThumbUpAltOutlinedIcon 
                        size="large"
                        />
                        <span>{response.data.likes}</span>

                        <Typography variant="h4" gutterBottom sx={{marginTop:5}}>
                                Comments
                         </Typography>
                        <CommentSection serverIp={serverIp} slug={slug} postId={response.data.id}/>
                    </Box>
                )
            }
        }
      }

    return (renderBlog())
}

export default Article;