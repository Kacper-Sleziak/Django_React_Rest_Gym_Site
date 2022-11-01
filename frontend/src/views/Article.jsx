import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axiosInstance from '../api/api_main_config';
import { useSelector } from 'react-redux';
import useAxios from '../hooks/useAxios';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import '../static/css/article.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Divider from '@mui/material/Divider';
import { getNickname }from '../store/slices/auth';
import Button from '@mui/material/Button';

function Article(){  
    let { slug } = useParams();
    const serverIp = "http://127.0.0.1:8000/"
    
    const [currentPage, setCurrentPage] = useState(1);
    const [newComment, setNewComment] = useState("");
    var totalCommentPages = 0;
    const commentsPerPage = 6;

    const userNickname = useSelector(getNickname);

    const [response, error, loading, refetch] = useAxios({
        axiosInstance: axiosInstance,
        method: 'GET',
        url: `/blog/${slug}`,
      });

    const [comResponse, comError, comLoading, comRefetch] = useAxios({
        axiosInstance: axiosInstance,
        method: 'GET',
        url: `/blog/comment/${slug}/?page=${currentPage}`,
      });

    const addNewComment = () => {
        console.log(newComment)
        setNewComment("")
    }

    const onPageChange = (event, page) => {
        if (currentPage !== page){
          setCurrentPage(page)
          comRefetch()
        }
      }

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
                            
                            <Typography variant="h6" gutterBottom>
                                Author: {response.data.author}
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

                        <Typography variant="h4" gutterBottom sx={{marginTop:10}}>
                                Comments
                         </Typography>

                        <List sx={{ 
                            width: '100%', 
                            maxWidth: 360, 
                            borderWidth: 1,
                            borderColor:"#339900",
                            borderTopStyle:"solid",
                            }}>

                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={getAvatarSrc("")} />
                                </ListItemAvatar>
                                <ListItemText
                                    secondary={
                                        <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"s
                                        >
                                        </Typography >
                                        <TextField
                                            id="outlined-textarea"
                                            label="Comment"
                                            color="success"
                                            value={newComment}
                                            multiline
                                            onChange={(e) => setNewComment(e.target.value)}
                                            />
                                        <Button 
                                            variant="contained" 
                                            color="success" 
                                            size="small"
                                            onClick={addNewComment}
                                            >
                                            Add New
                                        </Button>
                                        </React.Fragment>
                                    }
                                    
                                />

                            
                            </ListItem>
                            <Divider variant="inset" component="li" />

                            {renderComments()}
                        </List>

                        <Pagination 
                        shape="rounded"
                        onChange={onPageChange}
                        count={totalCommentPages} 
                        page={currentPage}
                        sx={{marginTop:2}}
                        />
                    </Box>
                )
            }
        }
      }

      const renderComments = () => {
        if (comResponse === undefined){
            return(<h1>Loading...</h1>)
        }
        else{
            if (comResponse.status !== 200) {
                return(<h2>No comments to show</h2>)
            }
            else{
                totalCommentPages = Math.ceil(comResponse.data.count/commentsPerPage)
                return(
                    comResponse.data.results.map((comment) => (
                        <>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={getAvatarSrc(comment.avatar)} />
                                </ListItemAvatar>
                                <ListItemText
                                    secondary={
                                        <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {comment.author}
                                        </Typography >

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{marginBottom:1}}
                                        >
                                            {comment.edited}
                                        </Typography>
                                        <div>
                                            {comment.body}
                                        </div>
                                        </React.Fragment>
                                    }
                                />
                            <div>
                                {RenderLikeIcon(comment.likers)}
                                <span>{comment.likes}</span>
                            </div>
                            
                            </ListItem>
                            <Divider variant="inset" component="li" />

                        </>

                    ))
                  ); 
            }
        }
    }

    const RenderLikeIcon = (likers) => {
        if (likers.includes(userNickname)){
            return(<FavoriteIcon fontSize='small' sx={{marginTop:1}}/>)
        }
        return(<FavoriteBorderIcon fontSize='small' sx={{marginTop:1}}/>)
    }

    const getAvatarSrc = (img) => {
        if (img === ""){
            return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
        }
        return serverIp + img 
            
    }

    return (renderBlog())
}

export default Article;