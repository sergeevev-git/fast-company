import axios from "axios";
// import logger from "./log.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import configFile from "../config/config.json";
import { httpAuth } from "../hooks/useAuth";
import localStorageService from "./localStorage.service";

//  создали экземпляр axios с определенным конфигом
const http = axios.create({
    baseURL: configFile.apiEndPoint
});

http.interceptors.request.use(
    async function (config) {
        // console.log(config);
        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url =
                (containSlash ? config.url.slice(0, -1) : config.url) + ".json";

            const expiresDate = localStorageService.getTokenExpiresDate();
            const refreshToken = localStorageService.getRefreshToken();
            if (refreshToken && expiresDate < Date.now()) {
                const { data } = await httpAuth.post("token", {
                    grant_type: "refresh_token",
                    refresh_token: refreshToken
                });
                console.log(data);
                localStorageService.setTokens({
                    refreshToken: data.refresh_token,
                    idToken: data.id_token,
                    expiresIn: data.expires_in,
                    localId: data.user_id
                });
            }
            const accessToken = localStorageService.getAccessToken();
            if (accessToken) {
                config.params = { ...config.params, auth: accessToken };
            }
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

function transformData(data) {
    return data && !data._id
        ? Object.keys(data).map((key) => ({
              ...data[key]
          }))
        : data;
}

//  перехватчик, 1й аргумент  - положительный ответ, 2 - error(unexpected)
http.interceptors.response.use(
    (res) => {
        if (configFile.isFireBase) {
            res.data = { content: transformData(res.data) };
        }
        return res;
    },
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
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete,
    patch: http.delete
};

export default httpService;
