import axios from "axios";

import { API_URL } from "../constants/";

const authHeader = {
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
    },
};

const commonApi = {
    getArticle: () =>
        axios.get(`${API_URL}/articles`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }),
    getAutoConstruction: () =>
        axios.get(`${API_URL}/constructions/autocomplete`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }),
};

export default commonApi;
