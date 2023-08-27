import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/v1/",
});

export const getAnyApi = (link, token) =>
    API.get(`${link}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

export const PostAnyApi = (link, input) => API.post(`${link}`, input);
export const postAnyAuth = (link, input, token) =>
    API.post(`${link}`,input, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });