import Axios from "axios";
import { ToastPresets } from "react-native-ui-lib";
import { setLoading, showHideToast } from "../redux/slices/OtherSlice";
import { store } from "../redux/store";
import { BASE_URL } from "./Endpoints";

const client = Axios.create({
    baseURL: BASE_URL,
})

client.interceptors.request.use(
    config => {
        let token = store.getState().Auth.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        config.headers["Accept"] = "application/json"
        config.headers["Content-Type"] = "multipart/form-data"

        return config;
    },
    error => {
        return Promise.reject(error);
    },
);


client.interceptors.response.use(
    res => {
        store.dispatch(setLoading(false))
        return Promise.resolve(res)
    },
    error => {
        console.warn("error", error.message)
        store.dispatch(setLoading(false))
        store.dispatch(showHideToast({
            visible: true,
            message: typeof error?.response?.data?.error?.messages == "object" ? Object.values(error?.response?.data?.error?.messages).join(",") : error.message == "Network Error" ? "Please check your network" : error?.response?.data?.error?.message ? error?.response?.data?.error?.message : error?.message,
            preset: ToastPresets.FAILURE
        }))
        return Promise.reject(error);
    },
);

export default client; 