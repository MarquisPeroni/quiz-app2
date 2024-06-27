import React from 'react';
import '../css/Footer.css';

const Footer = ({ quote }) => {
  return (
    <div className="footer-container">
      <div className="footer-left">
        <span className="crimson-red">X</span> 
      </div>
      <div className="footer-right">{quote}</div>
    </div>
  );
};

export default Footer;
