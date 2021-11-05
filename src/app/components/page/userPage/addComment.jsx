import React, { useState, useEffect } from "react";
import SelectField from "../../common/form/selectField";
import { validator } from "../../../utils/validator";
import TextArea from "../../common/form/textArea";
import api from "../../../api";
import PropTypes from "prop-types";

const AddComment = ({ users, pageOwner, setIsUpdate }) => {
    const [commentData, setCommentData] = useState({
        userId: "",
        pageId: pageOwner,
        content: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setCommentData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        userId: {
            isRequired: { message: "Выберите пользователя" }
        },
        content: {
            isRequired: { message: "Сообщение не может быть пустым" }
        }
    };

    useEffect(() => {
        validate();
    }, [commentData]);

    const validate = () => {
        const errors = validator(commentData, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const isValid = validate();
    //     if (!isValid) return;
    //     console.log(commentData);
    // };

    const addComment = (data) => {
        const isValid = validate();
        if (!isValid) return;
        api.comments.add(data).then((comment) => console.log(comment));
        setIsUpdate(true);
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                <div>
                    <h2>New comment</h2>

                    <SelectField
                        onChange={handleChange}
                        options={users}
                        defaultOption="Выберите пользователя..."
                        name="userId"
                        error={errors.userId}
                        value={commentData.userId}
                        label="Выберите пользователя"
                    />

                    <TextArea
                        name="content"
                        value={commentData.content}
                        label="Сообщение"
                        placeholder="Ваше сообщение здесь"
                        onChange={handleChange}
                        rows="3"
                        error={errors.content}
                    />
                    <div className="mb-4">
                        <button
                            className="btn btn-primary w-100 mx-auto"
                            type="submit"
                            disabled={!isValid}
                            onClick={() => addComment(commentData)}
                        >
                            Добавить комментарий
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

AddComment.propTypes = {
    users: PropTypes.array.isRequired,
    pageOwner: PropTypes.string.isRequired,
    // addComment: PropTypes.func.isRequired,
    setIsUpdate: PropTypes.func.isRequired
};

export default AddComment;
