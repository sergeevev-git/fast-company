import React from "react";
import { useHistory } from "react-router";

const BackHistoryButton = () => {
    const history = useHistory();
    // console.log(history);
    return (
        <button className="btn btn-primary" onClick={() => history.goBack()}>
            <i className="bi bi-caret-left">Назад</i>
        </button>
    );
};

export default BackHistoryButton;
