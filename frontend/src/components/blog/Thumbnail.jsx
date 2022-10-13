import React from 'react';
import PropTypes from 'prop-types';
import wege from '../../static/images/wege.webp';

function Thumbnail({
  tag, date, title, short,
}) {
  return (
    <div className="post">
      <div className="img_box">
        <img className="post_img" src={wege} alt="" />
        <span>
          {tag}
        </span>
      </div>
      <h5>{date}</h5>
      <h1>{title}</h1>
      <span className="post_short">
        {short}
      </span>
      <div className="read_more">
        <span>Read More</span>
      </div>
    </div>
  );
}
Thumbnail.defaultProps = {
  tag: null,
  date: null,
  title: null,
  short: null,
};
Thumbnail.propTypes = {
  tag: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
  short: PropTypes.string,
};

export default Thumbnail;
