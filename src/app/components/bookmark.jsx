import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ status }) => {
     const checkStatus = () => {
          return status ? "-check-fill" : "";
     };
     return <i className={"bi bi-bookmark" + checkStatus()}></i>;
};

export default Bookmark;
