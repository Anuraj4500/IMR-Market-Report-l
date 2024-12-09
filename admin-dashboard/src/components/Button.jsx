import React from "react";
import { Link } from "react-router-dom";

const Button = ({ text, onClick }) => {
    return (
        <button className="btn btn-primary" onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
