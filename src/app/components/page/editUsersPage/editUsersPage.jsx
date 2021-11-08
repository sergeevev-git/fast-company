import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { validator } from "../../../utils/validator";
import api from "../../../api";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";

const UserEditPage = () => {
    const { userId } = useParams();
    const history = useHistory();
    const [isUpdate, setIsUpdate] = useState(false);
    const [userData, setUserData] = useState({});

    const [professions, setProfessions] = useState([]);
    const [qualities, setQualities] = useState({});
    const [errors, setErrors] = useState({});

    //  у Василия реализовано иначе
    const getProfessionById = (id) => {
        for (const key in professions) {
            if (professions[key]._id === id) {
                return professions[key];
            }
        }
    };

    //  у Василия реализовано иначе
    const getQualities = (array) => {
        array = array.map((item) => item.value);
        return Object.values(qualities).filter((qualitie) => {
            return array.includes(qualitie._id);
        });
    };

    //  у Василия реализовано иначе
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = userData;
        api.users
            .update(userId, {
                ...userData,
                profession: getProfessionById(profession),
                qualities: getQualities(qualities)
            })
            .then((userData) => history.push(`/users/${userData._id}`));
        // console.log(userData);
    };

    //  у Василия реализовано иначе
    useEffect(() => {
        setIsUpdate(true);
        api.users.getById(userId).then(({ profession, ...data }) =>
            setUserData((prevState) => ({
                ...prevState,
                ...data,
                profession: profession._id
            }))
        );
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);

    // console.log(userData);
    useEffect(() => {
        if (userData._id) setIsUpdate(false);
    }, [userData]);

    const handleChange = (target) => {
        setUserData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    // const handleToPreviousPage = () => {
    //     history.push(`/users/${userData._id}`);
    // };

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

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row ">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isUpdate && Object.keys(professions).length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя:"
                                // type="name"
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
                                name="profession"
                                defaultOption="Choose..."
                                error={errors.profession}
                                value={userData.profession._id}
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
                                error={errors.qualities}
                            />

                            <button
                                className="btn btn-primary w-100 mx-auto"
                                type="submit"
                                disabled={!isValid}
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        <h1>Loading...</h1>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserEditPage;
