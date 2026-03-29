# Troubleshooting — AI Copilot Widget

Tài liệu này ghi lại tất cả các lỗi đã gặp trong quá trình tích hợp thực tế và cách sửa chính xác.

## Mục lục

1. [Panel mặc định vẫn hiện ra sau dispose()](#1-panel-mặc-định-vẫn-hiện-ra-sau-dispose)
2. [ask_user khiến trình duyệt bị treo](#2-ask_user-khiến-trình-duyệt-bị-treo)
3. [CSS của dự án xung đột với widget](#3-css-của-dự-án-xung-đột-với-widget)
4. [Agent click nhầm vào chính giao diện chat](#4-agent-click-nhầm-vào-chính-giao-diện-chat)
5. [Promise ask_user bị pending mãi khi huỷ ngang](#5-promise-ask_user-bị-pending-mãi-khi-huỷ-ngang)
6. [Markdown hiển thị dạng text thô](#6-markdown-hiển-thị-dạng-text-thô)

## 1. Panel mặc định vẫn hiện ra sau dispose()

**Triệu chứng:** Sau khi gọi `panel.dispose()`, panel UI gốc của `page-agent` (khung chat đen/tím gradient) vẫn xuất hiện lại khi Agent bắt đầu thực thi task.

**Nguyên nhân:** Thư viện `page-agent` tự tạo lại DOM element khi lifecycle chạy.

**Giải pháp:** Kết hợp 2 lớp phòng thủ:

```tsx
// Lớp 1: dispose() trong try-catch
try {
  if (agentRef.current.panel && typeof agentRef.current.panel.dispose === 'function') {
    agentRef.current.panel.dispose();
  }
} catch (err) {
  console.warn("[Copilot] Không thể huỷ panel:", err);
}

// Lớp 2: CSS cứng ép qua JSX (luôn render cùng component)
<style dangerouslySetInnerHTML={{
  __html: `
    #page-agent-runtime_agent-panel,
    div[data-page-agent-ignore="true"]:not(#copilot-custom-widget) {
      display: none !important;
      visibility: hidden !important;
      pointer-events: none !important;
      z-index: -99999 !important;
      width: 0 !important; height: 0 !important;
    }
  `
}} />
```

**Lưu ý:** KHÔNG dùng `document.createElement("style")` vì nó có thể bị xoá khi Hot Reload. Dùng JSX `<style>` để CSS tồn tại vĩnh viễn cùng component.

## 2. ask_user khiến trình duyệt bị treo

**Triệu chứng:** Khi Agent cần hỏi thêm thông tin, trình duyệt bị treo (ô nhập ẩn hoặc `window.prompt()` chạy ngầm).

**Nguyên nhân:** Panel mặc định của `page-agent` ghi đè callback `onAskUser` bằng logic hiện popup riêng hoặc `window.prompt()`. Khi đã dispose Panel, luồng này trở thành "vô hình" — prompt() chạy nhưng không ai nhìn thấy.

**Giải pháp:** Ghi đè **trực tiếp** hàm `execute` của tool `"ask_user"`:

```tsx
const askUserTool = agentRef.current.tools.get("ask_user");
if (askUserTool) {
  askUserTool.execute = async (input: any) => {
    const question = input.question;
    addMessage("agent", `🤔 ${question}`);
    setIsWaitingAnswer(true);
    const answer = await new Promise<string>((resolve) => {
      askUserResolverRef.current = resolve;
    });
    return `User answered: ${answer}`;
  };
}
```

**Tại sao không dùng onAskUser?** Vì constructor Panel luôn ghi đè lại callback onAskUser mỗi khi được khởi tạo. Việc ghi đè tool.execute là cách duy nhất đáng tin cậy.

## 3. CSS của dự án xung đột với widget

**Triệu chứng:** Widget Copilot hiển thị sai lệch (font, màu, kích thước) khi nhúng vào dự án có CSS riêng.

**Giải pháp:** 
- Đảm bảo widget dùng Tailwind CSS classes có tính đặc hiệu cao (specificity).
- Gán CSS variables hoặc design tokens phù hợp trong file CSS toàn cục của dự án.
- Nếu không dùng Tailwind: chuyển toàn bộ className thành inline styles.

## 4. Agent click nhầm vào chính giao diện chat

**Triệu chứng:** Agent cố tương tác với khung chat widget thay vì nội dung website thật.

**Giải pháp:** Gán 2 thuộc tính data lên root element của widget:

```tsx
<div 
  id="copilot-custom-widget"
  data-browser-use-ignore="true"
  data-page-agent-ignore="true"
>
```

`page-agent` sẽ tự động bỏ qua các element có thuộc tính `data-page-agent-ignore`.

## 5. Promise ask_user bị pending mãi khi huỷ ngang

**Triệu chứng:** Khi người dùng bấm nút Stop trong lúc Agent đang chờ trả lời, Promise không bao giờ được resolve, gây memory leak.

**Giải pháp:** Luôn resolve Promise rỗng khi huỷ:

```tsx
const handleStop = () => {
  agentRef.current?.stop();
  setIsExecuting(false);
  if (isWaitingAnswer && askUserResolverRef.current) {
    askUserResolverRef.current("");
    askUserResolverRef.current = null;
    setIsWaitingAnswer(false);
  }
  setCurrentActivity(null);
};
```

## 6. Markdown hiển thị dạng text thô

**Triệu chứng:** AI trả về text có `**in đậm**`, `- danh sách` nhưng hiển thị nguyên chuỗi ký tự thô.

**Giải pháp:** Cài `react-markdown` + `remark-gfm` và bọc nội dung tin nhắn agent:

```bash
npm install react-markdown remark-gfm
```

```tsx
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Trong phần render tin nhắn agent:
<ReactMarkdown remarkPlugins={[remarkGfm]} components={{...}}>
  {msg.content}
</ReactMarkdown>
```

**Lưu ý:** Với react-markdown v9+, prop `className` đã bị loại bỏ. Bọc thêm `<div className="...">` bên ngoài thay thế.
