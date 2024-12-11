import axios from "axios";
import { BASE_URL } from "./api";

export const uploadMedia = async (file, token) => {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
            url: BASE_URL + `/media/upload`,
            method: 'POST',
            headers: { "Authorization": `Bearer ${token}` },
            data: formData
        });

        return response.data;
    } catch (error) {
        console.error("Upload failed:", error);
    }
};
