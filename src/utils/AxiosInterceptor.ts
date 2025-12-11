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

        // Required headers for all API requests
        config.headers["Accept"] = "application/json";
        config.headers["X-API-Key"] = "TGXCOWWvETaUJvaGAaW3COmEnOieEabV";
        
        // Get language from Redux store, default to 'en' if not set
        const language = store.getState().Others.language || 'en';
        config.headers["Accept-Language"] = language;
        
        // Set Content-Type dynamically based on data type
        // If data is FormData, browser/axios will set the boundary automatically
        // If not set explicitly, axios will handle it correctly
        if (!(config.data instanceof FormData)) {
            config.headers["Content-Type"] = "application/json";
        }
        // For FormData, don't set Content-Type header - let axios handle it with boundary

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