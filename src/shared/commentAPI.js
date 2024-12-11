import axios from "axios";
import { BASE_URL } from "./api";

export const commentBlog = async (id, token, content) => {
    try {
        const response = await axios({
            url: BASE_URL + `/comment/${id}`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
            data: { content: content }
        })
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

export const updateComment = async (id, token, content) => {
    try {
        const response = await axios({
            url: BASE_URL + `/comment/update/${id}`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
            data: content
        })
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteComment = async (id, token) => {
    try {
        const response = await axios({
            url: BASE_URL + `/comment/${id}`,
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
        })
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

export const getComment = async (id, token) => {
    try {
        const response = await axios({
            url: BASE_URL + `/comment/blog/${id}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
        })
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}
