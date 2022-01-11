import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import CheckboxField from "../common/form/checkBoxField";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router";
// import * as yup from "yup";

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});
    const [enterError, setEnterError] = useState(null);
    const { signIn } = useAuth();
    const history = useHistory();

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        setEnterError(null);
    };

    // const validateScheme = yup.object().shape({
    //     password: yup
    //         .string()
    //         .required("password обязателен для заполнения")
    //         .matches(/(?=.*[A-Z])/, "пароль должен содержать заглавные буквы")
    //         .matches(/(?=.*[0-9])/, "пароль должен содержать цифры")
    //         .matches(
    //             /(?=.*[!@*$%^&*])/,
    //             "пароль должен содержать специальные символы"
    //         )
    //         .matches(/(?=.{8,})/, "пароль должен быть минимум 8 символов"),
    //     email: yup
    //         .string()
    //         .required("Email обязательная для заполнения")
    //         .email("Email введен некорректно")
    // });

    const validatorConfig = {
        email: {
            isRequired: { message: "Email обязательная для заполнения" }
            // isEmail: { message: "Email введен некорректно" }
        },
        password: {
            isRequired: { message: "password обязателен для заполнения" }
            // isCapitalSymbol: {
            //     message: "пароль должен содержать заглавные буквы"
            // },
            // isContainDigit: {
            //     message: "пароль должен содержать цифры"
            // },
            // min: {
            //     message: "пароль должен быть минимум 8 символов",
            //     value: 8
            // }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        //  покажет все ошибки, а не первую попавшуюся
        // validateScheme.validate(data,{abortEarly:false}).then(()=>).catch(()=>);
        // validateScheme
        //     .validate(data)
        //     .then(() => setErrors({}))
        //     .catch((err) => setErrors({ [err.path]: err.message }));
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        try {
            await signIn(data);
            history.push(
                history.location.state
                    ? history.location.state.from.pathname
                    : "/"
            );
        } catch (error) {
            setEnterError(error.message);
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
            <CheckboxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                Оставаться в системе
            </CheckboxField>
            {enterError && <p className="text-danger">{enterError}</p>}
            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid || enterError}
            >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
