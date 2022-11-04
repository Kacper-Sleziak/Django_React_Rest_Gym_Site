import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import axiosInstance from '../../api/api_main_config';
import useAxios from '../../hooks/useAxios';
import { useNavigate } from 'react-router-dom';

function BlogHeaders({nickname}) {
    const navigate = useNavigate();

    // blog api handler
    const [response, error, loading, refetch] = useAxios({
        axiosInstance: axiosInstance,
        method: 'GET',
        url: `/blog/author/${nickname}/`,
    });

    function renderBlogShorts() {

        if(response.data !== undefined){
            return(
                response.data.results.map((blog) => (
                    <ImageListItem 
                    sx={{cursor:'pointer'}}
                    onClick={() => navigate(`/article/${blog.slug}`)}
                    >
                        <img
                        src={blog.image}
                        >
                        </img>
                    <ImageListItemBar
                        title={blog.title}
                        subtitle={<span>{blog.tag}</span>}
                        position="below"
                    />
                    </ImageListItem>
                )
            ));
        }
    }

    return(
        <ImageList
        sx={{height: 450, maxWidth: 900, marginLeft: 'auto', marginRight: 'auto'}}
        >
            {renderBlogShorts()}
        </ImageList>
    )
}

export default BlogHeaders