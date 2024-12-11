import axios from "axios";
import { BASE_URL } from "./api";

export const getBlogs = async (token, page) => {
    try {
        const response = await axios({
            url: BASE_URL + `/blogs?page=${page}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` }
        })
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

export const getBlogsWithUser = async (token, page) => {
    try {
        const response = await axios({
            url: BASE_URL + `/blogs/withUser?page=${page}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` }
        })
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

export const getBlogsByUser = async (id, page) => {
    try {
        const response = await axios({
            url: BASE_URL + `/blogs/byUser/${id}?page=${page}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/json', }
        })
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

export const getBlogById = async (id) => {
    try {
        const response = await axios({
            url: BASE_URL + `/blogs/byId/${id}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

export const createBlog = async (data, token) => {
    try {
        const response = await axios({
            url: BASE_URL + `/blogs`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
            data: data
        })
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const deleteBlog = async (id, token) => {
    try {
        const response = await axios({
            url: BASE_URL + `/blogs/delete/${id}`,
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
        })
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const updateBlog = async (data, token) => {
    try {
        const response = await axios({
            url: BASE_URL + `/blogs/update/${data.id}`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
            data: data
        })
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const saveBlog = async (id, token) => {
    try {
        const response = await axios({
            url: BASE_URL + `/blogs/save/${id}`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
        })
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const searchBlog = async (search) => {
    try {
        const response = await axios({
            url: BASE_URL + `/blogs/search?q=${search}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/json', }
        })
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

export const getSavedBlogsWithUser = async (token, page) => {
    try {
        const response = await axios({
            url: BASE_URL + `/blogs/savedBlog?page=${page}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` }
        })
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

