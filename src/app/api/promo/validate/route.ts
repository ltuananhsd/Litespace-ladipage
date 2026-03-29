import { NextResponse } from "next/server";

// Danh sách mã khuyến mại mock
// TODO: Thay bằng database thật khi có backend
const MOCK_PROMOS: Record<
  string,
  {
    valid: boolean;
    discountType: "percent" | "fixed";
    value: number;
    programName: string;
  }
> = {
  LITESPACE10: {
    valid: true,
    discountType: "percent",
    value: 10,
    programName: "Ưu đãi ra mắt — Giảm 10%",
  },
  WELCOME20: {
    valid: true,
    discountType: "percent",
    value: 20,
    programName: "Chào mừng khách hàng mới — Giảm 20%",
  },
  STARTUP500K: {
    valid: true,
    discountType: "fixed",
    value: 500000,
    programName: "Hỗ trợ Startup — Giảm 500.000đ",
  },
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { valid: false, message: "Vui lòng nhập mã khuyến mại" },
        { status: 400 }
      );
    }

    // Giả lập delay mạng
    await new Promise((resolve) => setTimeout(resolve, 800));

    const promo = MOCK_PROMOS[code.toUpperCase()];

    if (promo) {
      return NextResponse.json({
        valid: true,
        discountType: promo.discountType,
        value: promo.value,
        programName: promo.programName,
      });
    }

    return NextResponse.json({
      valid: false,
      message: "Mã khuyến mại không tồn tại hoặc đã hết hạn",
    });
  } catch {
    return NextResponse.json(
      { valid: false, message: "Lỗi hệ thống, vui lòng thử lại" },
      { status: 500 }
    );
  }
}
