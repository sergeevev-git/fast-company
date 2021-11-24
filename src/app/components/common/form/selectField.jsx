import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
    label,
    value,
    name,
    onChange,
    defaultOption,
    options,
    error
}) => {
    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };

    function handleChange({ target }) {
        // console.log(target.name, target.value);
        onChange({ name: target.name, value: target.value });
    }

    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  name: options[optionName].name,
                  value: options[optionName]._id
              }))
            : options;

    return (
        <div className="mb-4">
            <label htmlFor="validationCustom04" className="form-label">
                {label}
            </label>

            <select
                // name="profession"
                name={name}
                className={getInputClasses()}
                id="validationCustom04"
                required
                value={value}
                onChange={handleChange}
            >
                <option disabled value="">
                    {defaultOption}
                </option>

                {optionsArray &&
                    optionsArray.map((option) => (
                        <option
                            value={option._id || option.value}
                            key={option._id || option.value}
                        >
                            {option.label}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

SelectField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string,
    defaultOption: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default SelectField;
