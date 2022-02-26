import React, { useState } from "react";

import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";
import TextAreaField from "../form/textAreaField";

const AddCommentForm = ({ addComment }) => {
    const [commentData, setCommentData] = useState({});

    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setCommentData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        content: {
            isRequired: { message: "Сообщение не может быть пустым" }
        }
    };

    const validate = () => {
        const errors = validator(commentData, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const clearForm = () => {
        setCommentData({});
        setErrors({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        addComment(commentData);
        clearForm();
    };

    return (
        <div>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}>
                <TextAreaField
                    name="content"
                    value={commentData.content || ""}
                    label="Сообщение"
                    placeholder="Ваше сообщение здесь"
                    onChange={handleChange}
                    error={errors.content}
                />
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary" disabled={!isValid}>
                        Добавить комментарий
                    </button>
                </div>
            </form>
        </div>
    );
};

AddCommentForm.propTypes = {
    addComment: PropTypes.func
};

export default AddCommentForm;
