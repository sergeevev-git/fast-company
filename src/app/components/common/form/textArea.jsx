import React from "react";
import PropTypes from "prop-types";

const TextArea = ({
    label,
    name,
    placeholder,
    value,
    onChange,
    rows,
    error
}) => {
    function handleChange({ target }) {
        console.log(target.name, target.value);
        onChange({ name: target.name, value: target.value });
    }

    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };

    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <textarea
                id={name}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                className={getInputClasses()}
                rows={rows}
            ></textarea>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

TextArea.propTypes = {
    label: PropTypes.string,
    //     type: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    rows: PropTypes.string,
    error: PropTypes.string
};

export default TextArea;
