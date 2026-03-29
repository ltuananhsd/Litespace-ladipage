# Kiến trúc hệ thống — AI Copilot Widget

## Tổng quan

Widget AI Copilot là một React component đóng gói thư viện **Alibaba Page-Agent** (`page-agent` trên npm) kết hợp với **OpenAI-compatible API** tùy chỉnh, cho phép người dùng ra lệnh bằng ngôn ngữ tự nhiên để AI tự động thao tác trên website (click, scroll, điền form, điều hướng).

## Sơ đồ luồng dữ liệu

```
Người dùng gõ lệnh
        │
        ▼
  ┌─────────────────────┐
  │  Chat UI (React)    │ ── state: messages, isExecuting, isWaitingAnswer
  │  - Input field      │
  │  - Message list     │
  │  - Activity status  │
  └──────────┬──────────┘
             │ handleExecute()
             ▼
  ┌─────────────────────┐
  │  PageAgent.execute() │ ── gửi task text đến LLM
  │  (page-agent core)  │
  └──────────┬──────────┘
             │ API call (OpenAI-compatible)
             ▼
  ┌─────────────────────┐
  │  LLM API Server     │ ── trả về JSON actions
  │  (baseURL + apiKey) │
  └──────────┬──────────┘
             │ Phân tích DOM + Thực thi actions
             ▼
  ┌─────────────────────┐
  │  Browser DOM        │ ── click, scroll, navigate, fill
  └─────────────────────┘
```

## Tech Stack bắt buộc

| Thư viện | Phiên bản tối thiểu | Mục đích |
|----------|---------------------|----------|
| `page-agent` | ^1.6.2 | Core AI agent thao tác DOM |
| `react` | ^18.0 hoặc ^19.0 | UI framework |
| `framer-motion` | ^10.0 | Animation cho chat panel |
| `lucide-react` | ^1.0 | Icon set |
| `react-markdown` | ^9.0 | Render Markdown trong chat |
| `remark-gfm` | ^4.0 | Plugin hỗ trợ bảng, checklist |

## Quyết định thiết kế quan trọng

### 1. Tại sao tự xây UI thay vì dùng Panel mặc định?

Panel mặc định của `page-agent` (`@page-agent/ui`) có nhiều hạn chế:
- Không thể tùy biến giao diện để khớp với design system của dự án
- Callback `onAskUser` bị Panel constructor ghi đè mỗi lần khởi tạo
- Không hỗ trợ Markdown rendering
- Không thể điều khiển vị trí, kích thước linh hoạt

### 2. Tại sao ghi đè tool.execute thay vì onAskUser?

`onAskUser` callback bị Panel constructor ghi đè. Dù đã reassign sau dispose(), nó vẫn không đáng tin cậy vì:
- Inner lifecycle của thư viện có thể reset callback
- Tool execute là điểm thực thi cuối cùng, không qua trung gian nào

### 3. Tại sao dùng CSS JSX thay vì document.createElement?

- `document.createElement("style")` bị mất khi React Hot Reload
- JSX `<style>` tồn tại cùng vòng đời component, đảm bảo luôn active
- Đặc hiệu (specificity) cao nhất nhờ `!important` trên mọi thuộc tính

### 4. Tại sao cần data-page-agent-ignore?

Thuộc tính này báo cho PageAgent biết không được tương tác (click, đọc) với element đó. Nếu thiếu, agent có thể cố click vào chính khung chat của mình thay vì nội dung website.

## Cấu hình biến môi trường

### Next.js (App Router)

```env
# .env.local
NEXT_PUBLIC_LLM_BASE_URL=https://api.openai.com/v1
NEXT_PUBLIC_LLM_API_KEY=sk-your-api-key-here
```

Đọc trong code:
```tsx
const LLM_BASE_URL = process.env.NEXT_PUBLIC_LLM_BASE_URL || "";
const LLM_API_KEY = process.env.NEXT_PUBLIC_LLM_API_KEY || "";
```

### Vite

```env
# .env
VITE_LLM_BASE_URL=https://api.openai.com/v1
VITE_LLM_API_KEY=sk-your-api-key-here
```

Đọc trong code:
```tsx
const LLM_BASE_URL = import.meta.env.VITE_LLM_BASE_URL || "";
const LLM_API_KEY = import.meta.env.VITE_LLM_API_KEY || "";
```

## Tích hợp vào Layout

### Next.js App Router

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

### Vite + React

```tsx
// src/App.tsx
import PageAgentCopilot from "./components/PageAgentCopilot";

function App() {
  return (
    <>
      {/* Nội dung app */}
      <PageAgentCopilot />
    </>
  );
}
```
