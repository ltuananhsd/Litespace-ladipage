"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import StepProgress from "@/components/shared/StepProgress";
import { useRegistration } from "@/hooks/useRegistration";

// === MOCK DATA TÒA NHÀ (sẽ thay bằng API/CMS khi có assets thật) ===
const buildings = [
  {
    id: "lmak-pearl-plaza",
    name: "L'MAK Pearl Plaza",
    address: "561A Điện Biên Phủ, Phường 25, Quận Bình Thạnh, TP.HCM",
    district: "Bình Thạnh",
    city: "TP. Hồ Chí Minh",
    status: "active" as const,
    highlight: "Vị trí đắc địa",
    features: ["Hạng A", "26 tầng", "Metro liền kề", "View sông Sài Gòn"],
    imageUrl: null, // TODO: Thay bằng ảnh thật khi có assets
  },
  {
    id: "lmak-saigon-centre",
    name: "L'MAK Saigon Centre",
    address: "65 Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM",
    district: "Quận 1",
    city: "TP. Hồ Chí Minh",
    status: "active" as const,
    highlight: "Trung tâm Q1",
    features: ["Hạng A+", "42 tầng", "CBD", "Thương hiệu quốc tế"],
    imageUrl: null,
  },
  {
    id: "lmak-bitexco",
    name: "L'MAK Bitexco Tower",
    address: "2 Hải Triều, Phường Bến Nghé, Quận 1, TP.HCM",
    district: "Quận 1",
    city: "TP. Hồ Chí Minh",
    status: "active" as const,
    highlight: "Biểu tượng TP.HCM",
    features: ["Hạng A+", "68 tầng", "Landmark", "Sky Deck"],
    imageUrl: null,
  },
  {
    id: "lmak-landmark",
    name: "L'MAK Landmark 81",
    address: "720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP.HCM",
    district: "Bình Thạnh",
    city: "TP. Hồ Chí Minh",
    status: "coming_soon" as const,
    highlight: "Tòa nhà cao nhất VN",
    features: ["Hạng S", "81 tầng", "Super Premium", "Vincom Center"],
    imageUrl: null,
  },
  {
    id: "lmak-hanoi-lotte",
    name: "L'MAK Lotte Hà Nội",
    address: "54 Liễu Giai, Phường Cống Vị, Quận Ba Đình, Hà Nội",
    district: "Ba Đình",
    city: "Hà Nội",
    status: "coming_soon" as const,
    highlight: "Trung tâm Hà Nội",
    features: ["Hạng A", "65 tầng", "Lotte Mall", "Observation Deck"],
    imageUrl: null,
  },
];

// Lọc thành phố
const cities = [...new Set(buildings.map((b) => b.city))];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BuildingPage() {
  const router = useRouter();
  const { state, updateState } = useRegistration();

  const [selectedId, setSelectedId] = useState(
    state.selectedBuilding?.id ?? null
  );
  const [cityFilter, setCityFilter] = useState<string | null>(null);

  const filtered = cityFilter
    ? buildings.filter((b) => b.city === cityFilter)
    : buildings;

  const handleContinue = () => {
    const building = buildings.find((b) => b.id === selectedId);
    if (!building || building.status !== "active") return;
    updateState({
      selectedBuilding: {
        id: building.id,
        name: building.name,
        address: building.address,
      },
      currentStep: 3,
    });
    router.push("/register/package");
  };

  return (
    <>
      <StepProgress currentStep={2} />

      {/* Tiêu đề */}
      <section className="pb-6">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-5">
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                location_city
              </span>
              Bước 2 — Chọn tòa nhà
            </div>
            <h1 className="font-headline text-3xl md:text-5xl font-extrabold text-on-surface tracking-tight mb-3">
              Chọn tòa nhà{" "}
              <span className="text-primary">đặt văn phòng</span>
            </h1>
            <p className="text-on-surface-variant text-base max-w-lg">
              Tất cả tòa nhà L&apos;MAK đều nằm tại vị trí trung tâm, hạng A trở
              lên.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bộ lọc thành phố */}
      <section className="pb-6">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setCityFilter(null)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                !cityFilter
                  ? "bg-primary text-on-primary shadow-md shadow-primary/20"
                  : "bg-surface-container-lowest text-on-surface-variant hover:bg-primary/5"
              }`}
            >
              Tất cả
            </button>
            {cities.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => setCityFilter(city)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  cityFilter === city
                    ? "bg-primary text-on-primary shadow-md shadow-primary/20"
                    : "bg-surface-container-lowest text-on-surface-variant hover:bg-primary/5"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid tòa nhà */}
      <section className="pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((building) => {
              const isActive = building.status === "active";
              const isSelected = selectedId === building.id;

              return (
                <motion.button
                  key={building.id}
                  variants={cardVariants}
                  type="button"
                  disabled={!isActive}
                  onClick={() => isActive && setSelectedId(building.id)}
                  className={`group relative text-left rounded-[2rem] overflow-hidden transition-all duration-300 ${
                    !isActive
                      ? "opacity-50 cursor-not-allowed"
                      : isSelected
                      ? "ring-2 ring-primary shadow-[0_12px_60px_rgba(0,88,187,0.12)] scale-[1.01]"
                      : "hover:shadow-[0_8px_40px_rgba(44,47,49,0.06)] hover:-translate-y-0.5 cursor-pointer"
                  }`}
                >
                  {/* Hình ảnh placeholder (gradient) */}
                  <div className="relative h-40 bg-gradient-to-br from-primary/10 via-surface-container to-tertiary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-5xl text-primary/20">
                      apartment
                    </span>

                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      {!isActive ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-on-surface/80 text-surface text-[10px] font-black uppercase tracking-wider">
                          <span className="material-symbols-outlined text-[12px]">
                            schedule
                          </span>
                          Sắp ra mắt
                        </span>
                      ) : building.highlight ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-on-primary text-[10px] font-black uppercase tracking-wider">
                          <span
                            className="material-symbols-outlined text-[12px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            star
                          </span>
                          {building.highlight}
                        </span>
                      ) : null}
                    </div>

                    {/* Radio */}
                    {isActive && (
                      <div className="absolute top-3 right-3">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            isSelected
                              ? "border-primary bg-surface-container-lowest"
                              : "border-surface-container-lowest/60"
                          }`}
                        >
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-3 h-3 rounded-full bg-primary"
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Nội dung */}
                  <div className="bg-surface-container-lowest p-5">
                    <h3 className="font-headline text-base font-extrabold text-on-surface mb-1 group-hover:text-primary transition-colors">
                      {building.name}
                    </h3>
                    <p className="text-xs text-on-surface-variant mb-3 line-clamp-2">
                      {building.address}
                    </p>

                    {/* Tags tính năng */}
                    <div className="flex flex-wrap gap-1.5">
                      {building.features.map((feat) => (
                        <span
                          key={feat}
                          className="px-2.5 py-0.5 rounded-full bg-surface text-[10px] font-bold text-on-surface-variant"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Nút hành động */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/register")}
            className="px-6 py-3.5 rounded-full border-2 border-outline-variant/20 text-on-surface-variant font-bold text-sm hover:border-primary hover:text-primary transition-all"
          >
            ← Quay lại
          </button>
          <button
            type="button"
            onClick={handleContinue}
            disabled={!selectedId || !buildings.find((b) => b.id === selectedId && b.status === "active")}
            className={`px-10 py-4 rounded-full font-bold text-base transition-all ${
              selectedId
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
      </section>
    </>
  );
}
