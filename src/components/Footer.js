import React from "react";
import PropTypes from 'prop-types';

const Footer = ({ children }) => (
  <footer className="mt-5 pt-4 pb-2">
    <div className="text-center py-3">{children}</div>
  </footer>
);

Footer.propTypes = {
  children: PropTypes.element
}

export default Footer;
