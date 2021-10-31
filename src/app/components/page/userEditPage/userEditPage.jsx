import React, { useState, useEffect } from "react";
import TextField from "../../common/form/textField";
import { validator } from "../../../utils/validator";
import api from "../../../api";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { useParams, useHistory } from "react-router-dom";

const UserEditPage = () => {
    const [userData, setUserData] = useState();
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState({});
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { userId } = useParams();
    const history = useHistory();

    const handleChange = (target) => {
        setUserData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    useEffect(() => {
        setIsLoading(true);
        api.users.getById(userId).then((data) => setUserData(data));
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);

    useEffect(() => {
        console.log("userData changed");
    }, [userData]);

    const getProfessionById = (id) => {
        for (const key in professions) {
            if (professions[key]._id === id) {
                return professions[key];
            }
        }
    };

    //     const getqualitiesById = (id) => {};

    const validatorConfig = {
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            }
        },
        email: {
            isRequired: { message: "Email обязательная для заполнение" },
            isEmail: { message: "Email введен некорректно" }
        },
        qualities: {
            isRequired: { message: "У Вас должно быть минимум одно качество" }
        }
    };

    useEffect(() => {
        validate();
    }, [userData]);

    const validate = () => {
        const errors = validator(userData, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        if (isLoading) {
            setUserData((prevState) => ({
                ...prevState,

                profession: getProfessionById(userData.profession)
            }));
        }
        history.push(`/users/${userData._id}`);

        console.log(JSON.parse(localStorage.getItem("users")));
        console.log(userData);
    };

    return (
        <>
            {userData ? (
                <div className="container mt-5">
                    <div className="row ">
                        <div className="col-md-8 offset-md-2 shadow p-4">
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Имя:"
                                    type="name"
                                    name="name"
                                    value={userData.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />

                                <TextField
                                    label="Электронная почта:"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />

                                <SelectField
                                    onChange={handleChange}
                                    options={professions}
                                    defaultOption="Choose..."
                                    error={errors.profession}
                                    value={userData.profession.name}
                                    label="Выберите вашу профессию:"
                                />

                                <RadioField
                                    onChange={handleChange}
                                    options={[
                                        { name: "Male", value: "male" },
                                        { name: "Female", value: "female" },
                                        { name: "Other", value: "other" }
                                    ]}
                                    value={userData.sex}
                                    label="Выберите ваш пол:"
                                    name="sex"
                                />

                                <MultiSelectField
                                    onChange={handleChange}
                                    options={qualities}
                                    name="qualities"
                                    label="Выберите ваши качества:"
                                    defaultValue={[userData.qualities]}
                                />

                                <button
                                    className="btn btn-primary w-100 mx-auto"
                                    type="submit"
                                    disabled={!isValid}
                                >
                                    Обновить
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </>
    );
};

export default UserEditPage;
