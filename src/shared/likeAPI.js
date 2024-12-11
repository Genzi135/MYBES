import axios from "axios";
import { BASE_URL } from "./api";

export const likeBlog = async (id, token) => {
    try {
        const response = await axios({
            url: BASE_URL + `/like/${id}`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` }
        })
        return response;
    } catch (error) {
        console.log(error);
    }
}