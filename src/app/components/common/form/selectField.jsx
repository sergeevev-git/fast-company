import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
    label,
    value,
    onChange,
    defaultOption,
    options,
    error
}) => {
    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };

    function handleChange({ target }) {
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
                name="profession"
                className={getInputClasses()}
                id="validationCustom04"
                // required
                value={value}
                onChange={handleChange}
            >
                <option disabled value="">
                    {defaultOption}
                </option>
                {optionsArray &&
                    optionsArray.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.name}
                        </option>
                    ))}
                {/* {professions &&
                    (Array.isArray(professions)
                        ? professions.map((profession) => (
                              <option
                                  //   selected={profession._id === data.profession}
                                  value={profession._id}
                                  key={profession._id}
                              >
                                  {profession.name}
                              </option>
                          ))
                        : Object.keys(professions).map((professionName) => (
                              <option
                                  //   selected={profession._id === data.profession}
                                  value={professions[professionName]._id}
                                  key={professions[professionName]._id}
                              >
                                  {professions[professionName].name}
                              </option>
                          )))} */}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

SelectField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    defaultOption: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default SelectField;
