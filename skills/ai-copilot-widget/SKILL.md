---
name: ai-copilot-widget
description: Tích hợp widget AI Copilot vào dự án React/Next.js sử dụng thư viện Alibaba Page-Agent và OpenAI-compatible API. Widget cho phép người dùng ra lệnh bằng ngôn ngữ tự nhiên để AI tự động thao tác trên website (click, scroll, điền form, điều hướng). Sử dụng khi người dùng muốn (1) Thêm AI Copilot/chatbot thao tác DOM vào website, (2) Tích hợp page-agent vào React/Next.js, (3) Xây dựng widget chat AI điều khiển trình duyệt, (4) Nhúng AI assistant có khả năng tương tác với giao diện web. Kích hoạt khi thấy 'copilot', 'page-agent', 'AI chat widget', 'AI thao tác web', 'browser automation chat', 'tích hợp AI copilot'.
---

# AI Copilot Widget

Tích hợp widget AI Copilot sử dụng `page-agent` + OpenAI-compatible API vào dự án React/Next.js.

## Quy trình tích hợp (6 bước tuần tự)

### Bước 1: Cài đặt dependencies

```bash
npm install page-agent framer-motion lucide-react react-markdown remark-gfm
```

### Bước 2: Cấu hình biến môi trường

Tạo file `.env.local` (Next.js) hoặc `.env` (Vite):

```env
# Next.js — bắt buộc prefix NEXT_PUBLIC_ để expose client-side
NEXT_PUBLIC_LLM_BASE_URL=https://api.openai.com/v1
NEXT_PUBLIC_LLM_API_KEY=sk-your-api-key-here

# Vite — bắt buộc prefix VITE_
# VITE_LLM_BASE_URL=https://api.openai.com/v1
# VITE_LLM_API_KEY=sk-your-api-key-here
```

### Bước 3: Copy component template

Copy file `assets/PageAgentCopilot.tsx` vào thư mục components của dự án (`src/components/`).

Sau khi copy, chỉnh sửa 3 điểm trong file:

1. **Model name** (dòng có `model:`): đổi thành model LLM bạn sử dụng
2. **System prompt** (dòng có `instructions.system`): đổi mô tả phù hợp website
3. **QUICK_SUGGESTIONS** (mảng gợi ý nhanh): đổi nội dung phù hợp trang web

Nếu dùng **Vite** thay vì Next.js, đổi cách đọc env:
```tsx
// Thay thế:
const LLM_BASE_URL = process.env.NEXT_PUBLIC_LLM_BASE_URL || "";
const LLM_API_KEY = process.env.NEXT_PUBLIC_LLM_API_KEY || "";
// Thành:
const LLM_BASE_URL = import.meta.env.VITE_LLM_BASE_URL || "";
const LLM_API_KEY = import.meta.env.VITE_LLM_API_KEY || "";
```

### Bước 4: Thêm component vào Layout gốc

**Next.js App Router:**
```tsx
// src/app/layout.tsx
import PageAgentCopilot from "@/components/PageAgentCopilot";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        {children}
        <PageAgentCopilot />
      </body>
    </html>
  );
}
```

**Vite + React:**
```tsx
// src/App.tsx
import PageAgentCopilot from "./components/PageAgentCopilot";
function App() {
  return (<>{/* app content */}<PageAgentCopilot /></>);
}
```

### Bước 5: Đảm bảo CSS tương thích

Component sử dụng Tailwind CSS classes. Nếu dự án **chưa có Tailwind**, có 2 lựa chọn:

- **Cài Tailwind:** Theo hướng dẫn chính thức tại tailwindcss.com
- **Chuyển sang inline styles:** Thay toàn bộ `className` thành `style={{...}}`

Nếu dự án **đã có Tailwind** nhưng dùng design tokens khác (ví dụ `primary`, `on-primary`), cập nhật CSS variables hoặc đổi class names trong component cho khớp.

### Bước 6: Kiểm tra và chạy

```bash
npm run dev
```

Xác nhận:
- [ ] Nút tròn AI Copilot hiện ở góc trái dưới
- [ ] Click mở khung chat với animation mượt
- [ ] Gõ lệnh → agent thực thi thao tác trên trang
- [ ] Panel mặc định của page-agent KHÔNG hiện ra
- [ ] Khi agent hỏi ngược, câu hỏi hiện trong chat (không có popup)

## 3 Bẫy phải tránh (Critical Pitfalls)

### Bẫy 1: KHÔNG được bỏ qua việc ghi đè tool ask_user

Nếu chỉ dùng `onAskUser` callback mà không ghi đè `tools.get("ask_user").execute`, trình duyệt SẼ BỊ TREO khi agent cần hỏi thông tin. Xem phần ghi đè tool trong code template.

### Bẫy 2: KHÔNG dùng document.createElement cho CSS ẩn panel

Dùng JSX `<style dangerouslySetInnerHTML>` thay vì `document.createElement("style")`. Lý do: Hot Reload sẽ xoá style tạo bằng JS, nhưng JSX style tồn tại vĩnh viễn.

### Bẫy 3: PHẢI gán data-page-agent-ignore lên root widget

Nếu thiếu, agent sẽ thao tác nhầm vào chính khung chat thay vì nội dung website.

## Tài liệu tham khảo

- **Kiến trúc chi tiết, sơ đồ luồng, quyết định thiết kế**: Đọc [references/architecture.md](references/architecture.md)
- **Tất cả lỗi đã gặp và giải pháp từng bước**: Đọc [references/troubleshooting.md](references/troubleshooting.md)
- **Code mẫu hoàn chỉnh sẵn sàng copy**: Xem [assets/PageAgentCopilot.tsx](assets/PageAgentCopilot.tsx)
