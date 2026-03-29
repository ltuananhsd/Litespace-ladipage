"use client";

import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepProgress from "@/components/shared/StepProgress";
import RegisterSidebar from "@/components/shared/RegisterSidebar";
import { useRegistration } from "@/hooks/useRegistration";

// === KIỂU DỮ LIỆU FILE UPLOAD ===
interface UploadFile {
  file: File;
  preview: string | null;
  status: "pending" | "uploading" | "done" | "error";
  progress: number;
}

interface KycDocument {
  id: string;
  label: string;
  description: string;
  icon: string;
  required: boolean;
  acceptTypes: string;
  maxSizeMB: number;
}

// Danh sách giấy tờ cần upload phụ thuộc loại đăng ký
const getRequiredDocuments = (
  regType: "new" | "transfer" | null
): KycDocument[] => {
  const common: KycDocument[] = [
    {
      id: "id-front",
      label: "CMND / CCCD — Mặt trước",
      description: "Chụp rõ, không mờ, không bị cắt góc",
      icon: "badge",
      required: true,
      acceptTypes: "image/*,.pdf",
      maxSizeMB: 10,
    },
    {
      id: "id-back",
      label: "CMND / CCCD — Mặt sau",
      description: "Chụp rõ, không mờ, không bị cắt góc",
      icon: "badge",
      required: true,
      acceptTypes: "image/*,.pdf",
      maxSizeMB: 10,
    },
  ];

  if (regType === "transfer") {
    return [
      ...common,
      {
        id: "gpkd",
        label: "Giấy phép đăng ký kinh doanh",
        description: "Bản scan hoặc chụp rõ nét GPKD hiện tại",
        icon: "description",
        required: true,
        acceptTypes: "image/*,.pdf",
        maxSizeMB: 20,
      },
      {
        id: "quyet-dinh",
        label: "Quyết định bổ nhiệm (nếu có)",
        description: "Dành cho trường hợp người đại diện không phải chủ DN",
        icon: "assignment_ind",
        required: false,
        acceptTypes: "image/*,.pdf",
        maxSizeMB: 20,
      },
    ];
  }

  return common;
};

export default function KycPage() {
  const router = useRouter();
  const { state, updateState, totals } = useRegistration();

  const documents = getRequiredDocuments(state.registrationType);
  const [uploadedFiles, setUploadedFiles] = useState<
    Record<string, UploadFile | null>
  >({});
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Kiểm tra tất cả file bắt buộc đã upload chưa
  const allRequiredUploaded = documents
    .filter((d) => d.required)
    .every(
      (d) =>
        uploadedFiles[d.id] &&
        uploadedFiles[d.id]!.status === "done"
    );

  // Xử lý chọn file
  const handleFileSelect = (docId: string, file: File) => {
    const doc = documents.find((d) => d.id === docId);
    if (!doc) return;

    // Validate kích thước
    if (file.size > doc.maxSizeMB * 1024 * 1024) {
      alert(`File quá lớn. Tối đa ${doc.maxSizeMB}MB`);
      return;
    }

    // Tạo preview
    const preview = file.type.startsWith("image/")
      ? URL.createObjectURL(file)
      : null;

    setUploadedFiles((prev) => ({
      ...prev,
      [docId]: { file, preview, status: "uploading", progress: 0 },
    }));

    // Giả lập upload (TODO: Thay bằng API thật khi có backend KYC)
    simulateUpload(docId);
  };

  // Giả lập tiến trình upload
  const simulateUpload = (docId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 25;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUploadedFiles((prev) => ({
          ...prev,
          [docId]: prev[docId]
            ? { ...prev[docId]!, status: "done", progress: 100 }
            : null,
        }));
      } else {
        setUploadedFiles((prev) => ({
          ...prev,
          [docId]: prev[docId]
            ? { ...prev[docId]!, progress: Math.min(progress, 99) }
            : null,
        }));
      }
    }, 300);
  };

  // Xóa file
  const handleRemove = (docId: string) => {
    const uploaded = uploadedFiles[docId];
    if (uploaded?.preview) URL.revokeObjectURL(uploaded.preview);
    setUploadedFiles((prev) => ({ ...prev, [docId]: null }));
  };

  // Bỏ qua KYC (chỉ cho "Mở mới")
  const handleSkip = () => {
    updateState({ kycStatus: "skipped", currentStep: 9 });
    router.push("/register/contract");
  };

  // Tiếp tục
  const handleContinue = () => {
    updateState({ kycStatus: "uploaded", currentStep: 9 });
    router.push("/register/contract");
  };

  return (
    <>
      <StepProgress currentStep={8} />

      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* === CỘT TRÁI === */}
            <div className="flex-1 min-w-0">
              {/* Tiêu đề */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-5">
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified_user
                  </span>
                  Bước 8 — Xác minh giấy tờ (KYC)
                </div>
                <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight mb-3">
                  Xác minh{" "}
                  <span className="text-primary">giấy tờ pháp lý</span>
                </h1>
                <p className="text-on-surface-variant text-base max-w-lg">
                  {state.registrationType === "transfer"
                    ? "Upload giấy tờ để chúng tôi xác minh và xử lý chuyển trụ sở nhanh nhất."
                    : "Upload CMND/CCCD để xác minh danh tính. Bước này giúp đẩy nhanh quá trình đăng ký."}
                </p>
              </motion.div>

              {/* Ghi chú bảo mật */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="p-4 rounded-2xl bg-secondary-container/20 mb-8 flex items-start gap-3"
              >
                <span
                  className="material-symbols-outlined text-primary text-xl mt-0.5"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  lock
                </span>
                <div className="text-xs text-on-surface-variant">
                  <p className="font-bold text-on-surface mb-1">
                    Dữ liệu được bảo mật tuyệt đối
                  </p>
                  <p>
                    Giấy tờ của bạn được mã hóa AES-256 và chỉ nhân viên pháp lý
                    được ủy quyền mới có thể xem. Tuân thủ PDPA & Luật An ninh
                    mạng.
                  </p>
                </div>
              </motion.div>

              {/* Danh sách upload */}
              <div className="space-y-4 mb-8">
                {documents.map((doc, index) => {
                  const uploaded = uploadedFiles[doc.id];
                  const isDone = uploaded?.status === "done";
                  const isUploading = uploaded?.status === "uploading";

                  return (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.08 }}
                      className={`p-6 rounded-[1.5rem] transition-all ${
                        isDone
                          ? "bg-surface-container-lowest ring-2 ring-primary/30"
                          : "bg-surface-container-lowest"
                      }`}
                    >
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            isDone ? "bg-primary/10" : "bg-surface"
                          }`}
                        >
                          <span
                            className={`material-symbols-outlined text-xl ${
                              isDone ? "text-primary" : "text-on-surface-variant"
                            }`}
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            {isDone ? "check_circle" : doc.icon}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-on-surface">
                              {doc.label}
                            </h4>
                            {doc.required ? (
                              <span className="text-[9px] font-black text-error uppercase">
                                Bắt buộc
                              </span>
                            ) : (
                              <span className="text-[9px] font-bold text-on-surface-variant/50 uppercase">
                                Tùy chọn
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-on-surface-variant">
                            {doc.description}
                          </p>
                        </div>
                      </div>

                      {/* Nội dung upload */}
                      <AnimatePresence mode="wait">
                        {!uploaded ? (
                          // Chưa upload — Drop zone
                          <motion.div
                            key="dropzone"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <input
                              ref={(el) => {
                                inputRefs.current[doc.id] = el;
                              }}
                              type="file"
                              accept={doc.acceptTypes}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFileSelect(doc.id, file);
                              }}
                              className="hidden"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                inputRefs.current[doc.id]?.click()
                              }
                              className="w-full py-6 border-2 border-dashed border-outline-variant/25 hover:border-primary/40 rounded-2xl flex flex-col items-center gap-2 text-on-surface-variant hover:text-primary transition-all cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-2xl">
                                cloud_upload
                              </span>
                              <span className="text-xs font-bold">
                                Nhấn để chọn file
                              </span>
                              <span className="text-[10px] text-on-surface-variant/50">
                                Hỗ trợ JPG, PNG, PDF · Tối đa {doc.maxSizeMB}MB
                              </span>
                            </button>
                          </motion.div>
                        ) : isUploading ? (
                          // Đang upload — Progress bar
                          <motion.div
                            key="uploading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-2"
                          >
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-on-surface-variant">
                                {uploaded.file.name}
                              </span>
                              <span className="text-primary font-bold">
                                {Math.round(uploaded.progress)}%
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden">
                              <motion.div
                                animate={{
                                  width: `${uploaded.progress}%`,
                                }}
                                className="h-full bg-primary rounded-full"
                              />
                            </div>
                          </motion.div>
                        ) : isDone ? (
                          // Đã upload — Preview
                          <motion.div
                            key="done"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-3"
                          >
                            {/* Thumbnail */}
                            {uploaded.preview ? (
                              <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface flex-shrink-0">
                                <img
                                  src={uploaded.preview}
                                  alt="Preview"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-on-surface-variant">
                                  picture_as_pdf
                                </span>
                              </div>
                            )}

                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-on-surface truncate">
                                {uploaded.file.name}
                              </p>
                              <p className="text-xs text-on-surface-variant">
                                {(uploaded.file.size / 1024 / 1024).toFixed(1)} MB
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleRemove(doc.id)}
                              className="p-2 rounded-xl hover:bg-error/5 text-on-surface-variant hover:text-error transition-colors"
                              title="Xóa file"
                            >
                              <span className="material-symbols-outlined text-lg">
                                delete
                              </span>
                            </button>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>

              {/* Nút hành động */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => router.push("/register/contact")}
                  className="px-6 py-3.5 rounded-full border-2 border-outline-variant/20 text-on-surface-variant font-bold text-sm hover:border-primary hover:text-primary transition-all"
                >
                  ← Quay lại
                </button>

                {/* Chỉ cho phép bỏ qua khi mở mới */}
                {state.registrationType === "new" && !allRequiredUploaded && (
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="px-6 py-3.5 rounded-full border-2 border-outline-variant/20 text-on-surface-variant font-bold text-sm hover:border-tertiary hover:text-tertiary transition-all"
                  >
                    Bỏ qua, gửi sau
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={
                    state.registrationType === "transfer" &&
                    !allRequiredUploaded
                  }
                  className={`flex-1 sm:flex-none px-10 py-4 rounded-full font-bold text-base transition-all ${
                    allRequiredUploaded ||
                    state.registrationType === "new"
                      ? "bg-primary text-on-primary shadow-xl shadow-primary/25 hover:scale-[1.02] active:scale-[0.99]"
                      : "bg-surface-container text-on-surface-variant cursor-not-allowed"
                  }`}
                >
                  Tiếp tục
                  <span className="material-symbols-outlined text-lg ml-1.5 align-middle">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>

            {/* === CỘT PHẢI: Sidebar === */}
            <RegisterSidebar state={state} totals={totals} />
          </div>
        </div>
      </section>
    </>
  );
}
