import React from 'react';
import '../styles/sidebar.css'
import image_1 from './/image1.jpg'
const sidebar = () => {
  return (
    <div className="sidebar-info">
      <h2>Get Started With KoinX for Free</h2>
      <p>
        With our range of features that you can equip for free , KoinX allows you to be more educated and aware of your tax reports.
      </p>
      <img
        src= {image_1}
        alt=''
        style={{ width: '178px', height: '150px' }}
      />
      <button>Get Started for FREE {'->'} </button>
    </div>
  );
};

export default sidebar;