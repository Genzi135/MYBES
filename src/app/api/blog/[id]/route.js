// app/api/blog/[id]/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';
import { BASE_URL } from '@/shared/api';
import { tiptapJSONToText } from '@/lib/helper';
import { renderJSONToHTML } from '@/lib/renderHTMLfromJSON';


export async function GET(req, { params }) {
    const { id } = params; // Lấy ID từ URL

    try {
        const response = await axios.get(`${BASE_URL}/blogs/byId/${id}`, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.data) {
            const returnData = {
                id: response.data.data.id,
                author: response.data.data.author,
                title: response.data.data.title,
                contentJSON: response.data.data.contentJSON,
                contentTEXt: tiptapJSONToText(response.data.data.contentJSON),
                contentHTML: renderJSONToHTML(response.data.data.contentJSON),
                thumbnail: response.data.data.thumbnail,
                tags: response.data.data.tags,
                create_at: response.data.data.create_at,
                update_at: response.data.data.update_at,

            }
            return NextResponse.json(returnData);
        }
    } catch (error) {
        console.error('Error fetching blog:', error.message);
        return NextResponse.json(
            { message: 'Failed to fetch blog', error: error.message },
            { status: 500 }
        );
    }
}
