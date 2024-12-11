import axios from 'axios';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
        return new Response('Email not provided', { status: 400 });
    }

    try {
        const response = await axios({
            method: 'GET',
            url: `${process.env.BASE_URL}/users/${email}`,
            headers: {
                'Content-Type': 'application/json',
            },
        });


        return new Response(JSON.stringify(response.data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error in GET request:', error);

        return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
