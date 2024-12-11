import OpenAI from "openai";
import { NextResponse } from "next/server";

// Khởi tạo OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export async function POST(req) {
//     console.log("API /generateImage is running...");
//     try {
//         const body = await req.json();
//         const { prompt } = body;

//         // Kiểm tra dữ liệu đầu vào
//         if (!prompt || prompt.trim() === "") {
//             return NextResponse.json(
//                 { error: "Prompt cannot be empty" },
//                 { status: 400 }
//             );
//         }

//         // Gọi OpenAI API để tạo hình ảnh
//         const imageResponse = await openai.images.generate({
//             model: "dall-e-2",
//             prompt,
//             n: 1, // Số lượng ảnh cần tạo
//             size: "1024x1024", // Kích thước ảnh
//         });

//         // Lấy URL của ảnh đã tạo
//         const imageUrl = imageResponse.data[0]?.url;

//         if (!imageUrl) {
//             throw new Error("No valid image URL received from OpenAI API");
//         }

//         console.log("Image URL:", imageUrl);

//         // Trả về kết quả
//         return NextResponse.json({ imageUrl }, { status: 200 });
//     } catch (error) {
//         console.error("Error:", error.message || error.response?.data);

//         return NextResponse.json(
//             { error: "An error occurred while processing your request" },
//             { status: 500 }
//         );
//     }
// }
