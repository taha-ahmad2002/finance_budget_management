import axios from "axios";

export const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
    withCredentials: true, // crucial for cookies
});