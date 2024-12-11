import axios from "axios";
import { BASE_URL } from "./api";

export const updateUser = async (id, token, updateUserDto) => {
    try {
        const response = await axios({
            url: BASE_URL + `/user/${id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            data: updateUserDto,
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};


export const changeAvatar = async (token, image) => {
    try {
        const formData = new FormData();
        formData.append("image", image);

        const response = await axios({
            url: BASE_URL + `/user/uploadAvatar`,
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            },
            data: formData,
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const changeName = async (name, token) => {
    try {
        const response = await axios({
            url: BASE_URL + '/user/change-name',
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            data: { name: name },
        })
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export const changeHeader = async (id, token) => {
    try {
        const response = await axios({
            url: BASE_URL + `/user/update-header`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            data: { id: id },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const changeHColor = async (color, token) => {
    try {
        const response = await axios({
            url: BASE_URL + `/user/update-color`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            data: { color: color },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const searchUsers = async (query) => {
    try {
        const response = await axios({
            url: BASE_URL + `/user/search?q=${query}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/json', }
        })
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const updatePage = async (token, { id, props }) => {
    try {
        const response = await axios({
            url: BASE_URL + `/user/updatePage`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            data: { body: { id: id, props: props } },
        })
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const updatePageComponent = async (token, index, { id, props }) => {
    try {
        const response = await axios({
            url: BASE_URL + `/user/updateComponent/${index}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            data: { body: { id: id, props: props } },
        })
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const deletePage = async (token, index) => {
    try {
        const response = await axios({
            url: BASE_URL + `/user/deleteComponent/${index}`,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
        })
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const updateFullPage = async (token, page) => {
    try {
        const response = await axios({
            url: BASE_URL + `/user/updateBody`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            data: { body: page },
        })
        return response;
    } catch (error) {
        console.log(error);
    }
}
