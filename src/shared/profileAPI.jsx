import axios from "axios";
import { BASE_URL } from "./api";

export const updateHeaderV2 = async (token, header) => {
    try {
        const response = await axios({
            url: BASE_URL + `/user/updateHeader`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            data: { header: header },
        })
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const updateFooterV2 = async (token, footer) => {
    try {
        const response = await axios({
            url: BASE_URL + `/user/updateFooter`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            data: { footer: footer },
        })
        return response;
    } catch (error) {
        console.log(error);
    }
}