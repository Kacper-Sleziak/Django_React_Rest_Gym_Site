import React from 'react';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from 'react-redux';
import { getNickname }from '../../store/slices/auth';
import Divider from '@mui/material/Divider';

function Comment({comment}){
    const serverIp = "http://127.0.0.1:8000/"
    const userNickname = useSelector(getNickname);

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

    return(                        <>
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
    )
}

export default Comment
