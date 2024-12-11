import axios from 'axios';

export async function POST(request) {
    try {
        const reqData = await request.json();

        console.log("Received data:", reqData);

        const response = await axios({
            url: process.env.BASE_URL + '/login',
            method: 'POST',
            data: {
                email: reqData.email,
                password: reqData.password,
            },
        });

        return new Response(JSON.stringify(response.data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {

        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
