import React from "react";
import PropTypes from "prop-types";

const CheckboxField = ({ name, value, onChange, children, error }) => {
    const handleChange = () => {
        onChange({ name: name, value: !value });
    };
    const getInputClasses = () => {
        return "form-check-input" + (error ? " is-invalid" : "");
    };

    return (
        <div className="form-check mb-4">
            <input
                className={getInputClasses()}
                onChange={handleChange}
                type="checkbox"
                value=""
                id={name}
                checked={value}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
                {children}
            </label>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

CheckboxField.propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.bool,
    error: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default CheckboxField;
