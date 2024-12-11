import axios from "axios";

export const BASE_URL = 'https://mybes-server-production.up.railway.app/api/v1';

export const Login = async (email, password) => {
    try {
        const response = await axios({
            url: `${BASE_URL}/auth/login`,
            method: 'POST',
            data: { email, password },
            headers: { 'Content-Type': 'application/json' }
        });

        if (response && response.data) {
            return response.data; // Trả về dữ liệu
        }
    } catch (error) {
        console.error('Error during login:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const register = async (email, password, name) => {
    try {
        const response = await axios({
            url: `${BASE_URL}/auth/register`,
            method: 'POST',
            data: { email, password, name },
            headers: { 'Content-Type': 'application/json' }
        });

        if (response && response.data) {
            return response.data; // Trả về dữ liệu
        }
    } catch (error) {
        console.error('Error during login:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export const activeAccount = async (OTP, email) => {
    try {
        const response = await axios({
            url: `${BASE_URL}/auth/active/${email}`,
            method: 'POST',
            data: { token: OTP },
            headers: { 'Content-Type': 'application/json' }
        });

        if (response && response.data) {
            return response.data;
        }
    } catch (error) {
        console.error('Error during login:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export const refreshOTP = async (email) => {

    try {
        const response = await axios({
            url: `${BASE_URL}/auth/refreshActiveToken/${email}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (response && response.data) {
            return response.data;
        }
    } catch (error) {
        console.error('Error during login:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export const getMe = async (token) => {

    const response = await axios({
        url: BASE_URL + '/user',
        method: 'GET',
        headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` }
    })
    if (response) {
        return response.data
    }
}

export const getUserById = async (id) => {
    try {
        const response = await axios({
            url: BASE_URL + '/user/' + id,
            method: 'GET',
            headers: { 'Content-Type': 'application/json', }
        })
        if (response) {
            return response.data
        }
    } catch (error) {
        console.log(error);
    }
}

export const requestPasswordReset = async (email) => {
    try {
        const response = await axios({
            url: BASE_URL + '/auth/request-password-reset',
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            data: { email: email }
        })
        if (response) {
            return response.data
        }
    } catch (error) {
        console.log(error);
    }
}

export const resetPassword = async (email, token, newPassword) => {
    try {
        const response = await axios({
            url: BASE_URL + '/auth/reset-password',
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            data: {
                email: email,
                token: token,
                newPassword: newPassword
            }
        })
        if (response) {
            return response.data
        }
    } catch (error) {
        console.log(error);
    }
}

export const changePassword = async (otp, token, password) => {
    console.log(otp, token, password);
    try {
        const response = await axios({
            url: BASE_URL + '/auth/change-password',
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
            data: {
                token: otp,
                newPassword: password
            }
        })
        if (response) {
            return response.data
        }
    } catch (error) {
        console.log(error);
    }
}





