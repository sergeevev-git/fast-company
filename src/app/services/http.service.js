import axios from "axios";
// import logger from "./log.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../config/config.json";

axios.defaults.baseURL = config.apiEndPoint;

//  перехватчик, 1й аргумент  - положительный ответ, 2 - error(unexpected)
axios.interceptors.response.use(
    (res) => res,
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;
        if (!expectedErrors) {
            console.log(error);
            toast.error("some error happened");
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};

export default httpService;
