// src/app/api/chatBot/chat/route.js
import OpenAI from "openai";
import { NextResponse } from "next/server";

// Khởi tạo OpenAI client
const openai = new OpenAI();

// export async function POST(req) {
//     console.log('api run');
//     try {
//         const body = await req.json();
//         const { message } = body;

//         if (!message || message.trim() === "") {
//             return NextResponse.json(
//                 { error: "Message cannot be empty" },
//                 { status: 400 }
//             );
//         }

//         const completion = await openai.chat.completions.create({
//             model: "gpt-4o-mini",
//             messages: [
//                 { role: "system", content: "You are a helpful assistant." },
//                 { role: "user", content: message },
//             ],
//         });

//         const chatResponse = completion.choices[0]?.message?.content;

//         if (!chatResponse) {
//             throw new Error("No valid response from OpenAI API");
//         }

//         return NextResponse.json({ message: chatResponse }, { status: 200 });
//     } catch (error) {
//         console.error("Error:", error.message || error.response?.data);
//         return NextResponse.json(
//             { error: "An error occurred while processing your request" },
//             { status: 500 }
//         );
//     }
// }
