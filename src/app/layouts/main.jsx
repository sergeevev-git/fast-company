import React from "react";
import useMockData from "../utils/mockData";

const Main = () => {
    const { error, initialize, progress, status } = useMockData();
    const handleClick = () => {
        initialize();
    };

    return (
        <div className="container mt-5">
            <h1>Main</h1>
            <h3>иинциализация данных в FireBase</h3>
            <ul>
                <li>Статус: {status}</li>
                <li>Прогресс: {progress}%</li>
                {error && <li>error: {error}</li>}
            </ul>
            <button className="btn btn-primary" onClick={handleClick}>
                инциализировать
            </button>
        </div>
    );
};

export default Main;
