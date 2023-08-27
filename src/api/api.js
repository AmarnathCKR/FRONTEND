import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/v1/",
});
export const getWithoutAuth = (link) =>
    API.get(`${link}`);


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

    export const uploadImage = (formData) => {

        return axios.post( "https://api.cloudinary.com/v1_1/dqrpxoouq/image/upload", formData)
    }