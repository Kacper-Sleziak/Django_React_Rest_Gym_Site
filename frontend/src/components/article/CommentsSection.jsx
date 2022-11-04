import React, { useState } from 'react';
import ListItemText from '@mui/material/ListItemText';
import axiosInstance from '../../api/api_main_config';
import useAxios from '../../hooks/useAxios';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import Typography from '@mui/material/Typography';
import { getId }from '../../store/slices/auth';
import { useSelector } from 'react-redux';
import Comment from './Comment'
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';

function CommentSection(props){
    // states
    const [currentPage, setCurrentPage] = useState(1);
    const [newComment, setNewComment] = useState("");
    
    // comments settings
    var totalCommentPages = 0;
    const commentsPerPage = 6;
    
    // informations abour user
    const userId = useSelector(getId);
    
    // comments api handler
    const [response, error, loading, refetch] = useAxios({
        axiosInstance: axiosInstance,
        method: 'GET',
        url: `/blog/comment/${props.slug}/?page=${currentPage}`,
        });
    
    // new comment api handler
    const [newComResponse, newComStatusCode, newComError, newComLoading, axiosFetch] = useAxiosFunction();
    
    const addNewComment = () => {
        axiosFetch({
            axiosInstance: axiosInstance,
            method: 'POST',
            url: '/blog/comment/create/',
            requestConfig: {
                author: userId,
                blog_post: props.postId,
                body: newComment,
                },
        });
        setNewComment("")
        refetch()
    };

    // handle change of page in pagination bar 
    const onPageChange = (event, page) => {
        if (currentPage !== page){
            setCurrentPage(page)
            refetch()
        }
    }

    const renderComments = () => {
        if (response === undefined){
            return(<h1>Loading...</h1>)
        }
        else{
            if (response.status !== 200) {
                return(<h2>No comments to show</h2>)
            }
            else{
                totalCommentPages = Math.ceil(response.data.count/commentsPerPage)
                return(
                    response.data.results.map((comment) => ( 
                        <Comment comment={comment}/>
                    ))
                  ); 
            }
        }
    }

    const getAvatarSrc = (img) => {
        if (img === ""){
            return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
        }
        return props.serverIp + img 
            
    }
    
    return(
        <>
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
        </>
)
}

export default CommentSection
