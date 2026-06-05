import type { CSSProperties } from "react";

import { Button } from "../ui";

export function HomepageHero() {
  return (
          <section className="hub-hero hub-center">
            <div className="hub-hero-sigil" aria-hidden="true" />
            <div className="hub-zodiac" aria-hidden="true">
              {["☉", "☽", "♃", "♄", "♀", "♂"].map((symbol, index) => (
                <span key={symbol} style={{ "--i": index } as CSSProperties}>
                  {symbol}
                </span>
              ))}
            </div>
            <div>
              <div className="hub-pill">✦ Thuật toán chuẩn xác · Tri thức chuyên gia · Luận giải độc bản</div>
              <h1 className="hub-title">
                Khám Phá <span>Bản Thân</span>
              </h1>
              <div className="hub-subtitle">qua lăng kính vũ trụ</div>
              <p className="hub-copy">
                Hợp nhất 6 hệ thống tinh hoa: Thần số học, Tarot, Tử vi, Chiêm sao, Ma trận & Bát tự.
                Vận hành bằng Engine & Kho tri thức độc quyền - Nói không với AI và những công thức đại trà.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button href="/than-so-hoc" size="lg" variant="primary">
                  ✨ Bắt đầu miễn phí
                </Button>
                <Button href="/" size="lg" variant="secondary">
                  Đăng nhập bằng Google
                </Button>
              </div>
              <div className="hub-micro">
                <span>✓ Có bản xem trước miễn phí</span>
                <span>✓ Bảo mật thông tin cá nhân</span>
                <span>✓ Kết quả chuyên sâu</span>
              </div>
            </div>
          </section>
  );
}
