import React, { useState, useEffect } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { useSelector, useDispatch } from "react-redux";
import {
    getQualities,
    getQualitiesLoadingStatus
} from "../../../store/qualities";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../../store/professions";
import { getCurrentUserData, updateUser } from "../../../store/users";

const UserEditPage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUserData());
    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());

    const qualities = useSelector(getQualities());
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus());

    const [isUpdate, setIsUpdate] = useState(true);
    const [userData, setUserData] = useState();
    const [errors, setErrors] = useState({});

    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));

    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));

    function getQualitiesListByIds(qualitiesIds) {
        const qualitiesArray = [];
        for (const qualityId of qualitiesIds) {
            for (const quality of qualities) {
                if (quality._id === qualityId) {
                    qualitiesArray.push(quality);
                    break;
                }
            }
        }
        return qualitiesArray;
    }

    const transformData = (data) => {
        return getQualitiesListByIds(data).map((item) => ({
            label: item.name,
            value: item._id
        }));
    };

    useEffect(() => {
        if (
            !professionsLoading &&
            !qualitiesLoading &&
            currentUser & !userData
        ) {
            setUserData();
        }
        setUserData({
            ...currentUser,
            qualities: transformData(currentUser.qualities)
        });
    }, []);

    useEffect(() => {
        if (userData && isUpdate) setIsUpdate(false);
    }, [userData]);

    const handleChange = (target) => {
        setUserData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        name: {
            isRequired: {
                message: "?????? ?????????????????????? ?????? ????????????????????"
            }
        },
        email: {
            isRequired: { message: "Email ???????????????????????? ?????? ????????????????????" },
            isEmail: { message: "Email ???????????? ??????????????????????" }
        },
        qualities: {
            isRequired: { message: "?? ?????? ???????????? ???????? ?????????????? ???????? ????????????????" }
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
        dispatch(
            updateUser({
                ...userData,
                qualities: userData.qualities.map((q) => q.value)
            })
        );
    };

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row ">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isUpdate ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="??????:"
                                // type="name"
                                name="name"
                                value={userData.name}
                                onChange={handleChange}
                                error={errors.name}
                            />

                            <TextField
                                label="?????????????????????? ??????????:"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                error={errors.email}
                            />

                            <SelectField
                                onChange={handleChange}
                                options={professionsList}
                                name="profession"
                                defaultOption="Choose..."
                                error={errors.profession}
                                value={userData.profession}
                                label="???????????????? ???????? ??????????????????:"
                            />

                            <RadioField
                                onChange={handleChange}
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={userData.sex}
                                label="???????????????? ?????? ??????:"
                                name="sex"
                            />

                            <MultiSelectField
                                onChange={handleChange}
                                options={qualitiesList}
                                name="qualities"
                                label="???????????????? ???????? ????????????????:"
                                defaultValue={userData.qualities}
                                error={errors.qualities}
                            />

                            <button
                                className="btn btn-primary w-100 mx-auto"
                                type="submit"
                                disabled={!isValid}
                            >
                                ????????????????
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
