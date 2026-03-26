import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({
  baseURL: 'https://9router.vuhai.io.vn/v1',
  apiKey: 'sk-4bd27113b7dc78d1-lh6jld-f4f9c69f',
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages are required and must be an array.' }, { status: 400 });
    }

    const dataPath = path.join(process.cwd(), 'src/data/chatbot_data.txt');
    let knowledgeBase = '';
    
    try {
      knowledgeBase = fs.readFileSync(dataPath, 'utf8');
    } catch (err) {
      console.warn('Could not read chatbot_data.txt', err);
    }

    const systemPrompt = `
Vai trò: Bạn là AI trợ lý độc quyền cho chuyên gia Nguyễn Văn A.
Dưới đây là thông tin về chuyên gia (Knowledge Base):
---
${knowledgeBase}
---
QUY TẮC BẮT BUỘC:
1. Chỉ được trả lời dựa trên Knowledge Base ở trên. Nếu câu hỏi nằm ngoài phạm vi, từ chối nhẹ nhàng và hướng dẫn người dùng liên hệ qua email hoặc Zalo ở trên.
2. Phải trả lời bằng Markdown đẹp mắt (sử dụng in đậm, danh sách bullet nếu có nhiều ý, ngắt dòng hợp lý).
3. Luôn luôn:
   - Chào thân thiện ở tin nhắn ban đầu.
   - Trả lời rõ ràng, dễ hiểu.
   - Kết thúc bằng lời mời/hỏi thêm.
`;

    const apiMessages = [
      { role: 'system', content: systemPrompt },
      ...messages,
    ];

    const response = await openai.chat.completions.create({
      model: 'ces-chatbot-gpt-5.4',
      messages: apiMessages,
      temperature: 0.7,
      max_tokens: 1500,
    });

    const aiMessage = response.choices[0]?.message?.content || "Xin lỗi, hiện tại tôi không thể trả lời.";

    return NextResponse.json({ reply: aiMessage });
  } catch (error: any) {
    console.error('Chatbot API Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
