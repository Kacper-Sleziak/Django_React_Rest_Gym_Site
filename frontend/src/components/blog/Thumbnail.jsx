import React from 'react';
import wege from '../../static/images/wege.webp';

function Thumbnail() {
  return (
    <div className="post">
      <div className="img_box">
        <img className="post_img" src={wege} alt="" />
        <span>
          Diet
        </span>
      </div>
      <h5>28.08.2021</h5>
      <h1>Vegetables</h1>
      <span className="post_short">
        Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Deleniti commodi velit  tempore non asperiores
        ratione voluptates elit.  Deleniti commodi velit
        Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Deleniti commodi velit tempore non asperiores
        ratione voluptates elit...
      </span>
      <div className="read_more">
        <span>Read More</span>
      </div>
    </div>
  );
}

export default Thumbnail;
