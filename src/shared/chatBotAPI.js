import axios from "axios";
import { BASE_URL } from "./api";

export async function AiGenerateImage(prompt, token) {
    try {
        const response = await axios({
            url: BASE_URL + `/media/generate-image`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
            data: { prompt: prompt }
        })
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function AiGenerateText(message, token) {
    try {
        const response = await axios({
            url: BASE_URL + `/media/generate-text`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
            data: { message: message }
        })
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}