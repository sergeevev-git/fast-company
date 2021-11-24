import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";

import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckboxField from "../common/form/checkBoxField";
import { useQualities } from "../../hooks/useQualities";
import { useProfessions } from "../../hooks/useProfession";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router";

const Registerform = () => {
    const history = useHistory();
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        license: false
    });
    const [errors, setErrors] = useState({});
    const { signUp } = useAuth();
    const { professions } = useProfessions();
    const { qualities } = useQualities();

    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));

    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: { message: "email обязательная для заполнение" },
            isEmail: { message: "Email введен некорректно" }
        },
        password: {
            isRequired: { message: "password обязателен для заполнение" },
            isCapitalSymbol: {
                message: "пароль должен содержать заглавные буквы"
            },
            isContainDigit: {
                message: "пароль должен содержать цифры"
            },
            min: {
                message: "пароль должен быть минимум 8 символов",
                value: 8
            }
        },
        profession: {
            isRequired: { message: "Выберите вашу профессию" }
        },
        license: {
            isRequired: {
                message: "необходимо принять лиценизонное соглашение"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value)
        };

        try {
            await signUp(newData);
            history.push("/");
        } catch (error) {
            setErrors(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="password"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <SelectField
                onChange={handleChange}
                options={professionsList}
                name="profession"
                defaultOption="Choose..."
                error={errors.profession}
                value={data.profession}
                label="Выберите вашу профессию"
            />

            <RadioField
                onChange={handleChange}
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                value={data.sex}
                label="Выберите ваш пол"
                name="sex"
            />

            <MultiSelectField
                onChange={handleChange}
                options={qualitiesList}
                name="qualities"
                label="Выберите ваши качества"
            />

            <CheckboxField
                value={data.license}
                onChange={handleChange}
                name="license"
                error={errors.email}
            >
                Подтвердить <a>лицензионное соглашение</a>
            </CheckboxField>

            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
            >
                Submit
            </button>
        </form>
    );
};

export default Registerform;
