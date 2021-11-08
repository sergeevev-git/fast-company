import React, { useState, useEffect } from "react";
import api from "../../../api";
import SelectField from "../../common/form/selectField";
import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";
import TextAreaField from "../form/textAreaField";

const initialData = { userId: "", content: "" };

const AddCommentForm = ({ addComment }) => {
    const [commentData, setCommentData] = useState(initialData);
    const [users, setUsers] = useState({});
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

    useEffect(() => {
        api.users.fetchAll().then(setUsers);
    }, []);

    const clearForm = () => {
        setCommentData(initialData);
        setErrors({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        addComment(commentData);
        clearForm();
    };

    const arrayOfUsers =
        users &&
        Object.keys(users).map((userId) => ({
            name: users[userId].name,
            value: users[userId]._id
        }));

    return (
        <div>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}>
                <SelectField
                    onChange={handleChange}
                    options={arrayOfUsers}
                    defaultOption="Выберите пользователя..."
                    name="userId"
                    error={errors.userId}
                    value={commentData.userId}
                    label="Выберите пользователя"
                />

                <TextAreaField
                    name="content"
                    value={commentData.content}
                    label="Сообщение"
                    placeholder="Ваше сообщение здесь"
                    onChange={handleChange}
                    error={errors.content}
                />
                <div className="d-flex justify-content-end">
                    <button
                        className="btn btn-primary"
                        disabled={!isValid}
                        onClick={() => addComment(commentData)}
                    >
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
