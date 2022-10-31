import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function Thumbnail({
  key, blog
}) {
  
  const navigate = useNavigate();

  return (
    <div className="post">
      <div className="img_box">
        <img className="post_img" src={blog.image} alt={blog.title} />
        <span>
          {blog.tag}
        </span>
      </div>
      <h5>{blog.date}</h5>
      <h1>{blog.title}</h1>
      <span className="post_short">
        {blog.short}
      </span>
      <button className="read_more" onClick={()=> navigate(`/article/${blog.slug}`)}>
        Read More
      </button>
    </div>
  );
}
Thumbnail.defaultProps = {
  tag: null,
  date: null,
  title: null,
  short: null,
  img: null,
};
Thumbnail.propTypes = {
  tag: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
  short: PropTypes.string,
  img: PropTypes.string,
};

export default Thumbnail;
