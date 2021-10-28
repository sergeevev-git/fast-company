import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckboxField from "../common/form/checkBoxField";

const Registerform = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        license: false
    });
    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
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
                options={professions}
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

            {/* <div className="mb-4">
                <label htmlFor="validationCustom04" className="form-label">
                    Professions
                </label>
                <select
                    className="form-select"
                    id="validationCustom04"
                    // required
                    name="profession"
                    value={data.profession}
                    onChange={handleChange}
                >
                    <option disabled value="">
                        Choose...
                    </option>
                    {professions &&
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
                              )))}
                </select>
                <div className="invalid-feedback">
                    Please select a valid profession.
                </div>
            </div> */}

            <MultiSelectField
                onChange={handleChange}
                options={qualities}
                name="qualities"
                label="Выберите ваши качества"
                defaultValue={data.qualities}
            />

            <CheckboxField
                value={data.license}
                onChange={handleChange}
                name="license"
                error={errors.license}
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
