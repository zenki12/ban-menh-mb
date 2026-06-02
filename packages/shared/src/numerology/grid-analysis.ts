import { PYTHAGORAS_CHART, normalizeVietnameseName } from "./calculator";
import type { GridCells } from "./charts";
import { CELL_KNOWLEDGE, ARROWS } from "./grid-kb-data";
import type { GridArrow } from "./grid-kb-data";
import { escapeHtml } from "./narrative-deep";

export type GridAnalysisSource = "dob" | "name";

function emptyGrid(): GridCells {
  const grid: GridCells = {};
  for (let i = 1; i <= 9; i++) grid[i] = 0;
  return grid;
}

export function parseDigitGrid(str: string): GridCells {
  const grid = emptyGrid();
  for (const ch of String(str)) {
    const n = Number(ch);
    if (n >= 1 && n <= 9) grid[n]++;
  }
  return grid;
}

export function parseNameGrid(name: string): GridCells {
  const grid = emptyGrid();
  for (const ch of normalizeVietnameseName(name)) {
    const n = PYTHAGORAS_CHART[ch];
    if (n) grid[n]++;
  }
  return grid;
}

export function combineGridCells(dobGrid: GridCells, nameGrid: GridCells): GridCells {
  const combinedGrid = emptyGrid();
  for (let i = 1; i <= 9; i++) combinedGrid[i] = (dobGrid[i] || 0) + (nameGrid[i] || 0);
  return combinedGrid;
}

export function buildCellAnalysis(grid: GridCells, source: GridAnalysisSource): string {
  let html = `<h4 style="font-family:var(--font-ui);font-size:1rem;color:#1e3a8a;margin:1.5rem 0 0.5rem">Phân Tích Từng Số Trong ${source === "dob" ? "Biểu Đồ Ngày Sinh" : "Biểu Đồ Tên"}</h4>`;

  for (let n = 1; n <= 9; n++) {
    const count = grid[n] || 0;
    const kb = CELL_KNOWLEDGE[n];
    if (!kb) continue;

    if (count === 0) {
      html += kb.zero;
    } else if (count === 1) {
      html += kb.one;
    } else {
      html += kb.many(count);
    }
  }
  return html;
}

export function buildArrowsAnalysis(grid: GridCells, sourceName: string): string {
  const activeArrows: GridArrow[] = [];
  const missingArrows: GridArrow[] = [];

  ARROWS.forEach((arrow) => {
    const hasAll = arrow.cells.every((c) => (grid[c] || 0) > 0);
    if (hasAll) activeArrows.push(arrow);
    else missingArrows.push(arrow);
  });

  let html = `<h4 style="font-family:var(--font-ui);font-size:1rem;color:#1e3a8a;margin:2rem 0 0.5rem">Phân Tích Mũi Tên Sức Mạnh — ${sourceName}</h4>`;

  if (activeArrows.length > 0) {
    html += `<p class="nar"><strong>Bạn sở hữu ${activeArrows.length} mũi tên sức mạnh</strong> — đây là những trục năng lượng hoạt động đầy đủ trong biểu đồ:</p>`;
    activeArrows.forEach((a) => {
      html += a.active;
    });
  } else {
    html += `<p class="nar" style="color:#64748b;font-style:italic;">Chưa có mũi tên hoàn chỉnh nào được hình thành trong ${sourceName.toLowerCase()}. Biểu đồ tên của bạn sẽ bổ sung các năng lượng còn thiếu.</p>`;
  }

  if (missingArrows.length > 0) {
    html += `<h4 style="font-family:var(--font-ui);font-size:1rem;color:#b91c1c;margin:1.5rem 0 0.5rem">Các Mũi Tên Chưa Hoàn Thiện — Cần Phát Triển:</h4>`;
    missingArrows.forEach((a) => {
      html += a.missing;
    });
  }

  return html;
}

export function buildCompensationAnalysis(
  dobGrid: GridCells,
  nameGrid: GridCells,
  combinedGrid: GridCells,
  name: string,
): string {
  const compensated: number[] = [];
  const stillMissing: number[] = [];

  for (let n = 1; n <= 9; n++) {
    if ((dobGrid[n] || 0) === 0) {
      if ((nameGrid[n] || 0) > 0) compensated.push(n);
      else stillMissing.push(n);
    }
  }

  // Arrows gained from combined
  const arrowsFromName: GridArrow[] = [];
  ARROWS.forEach((arrow) => {
    const hasInDob = arrow.cells.every((c) => (dobGrid[c] || 0) > 0);
    const hasInCombined = arrow.cells.every((c) => (combinedGrid[c] || 0) > 0);
    if (!hasInDob && hasInCombined) arrowsFromName.push(arrow);
  });

  // Isolated numbers in DOB
  const isolated: number[] = [];
  for (let n = 1; n <= 9; n++) {
    if ((dobGrid[n] || 0) === 1) {
      // Check if it's not connected by any arrow
      const connected = ARROWS.some((a) => a.cells.includes(n) && a.cells.every((c) => (dobGrid[c] || 0) > 0));
      if (!connected) isolated.push(n);
    }
  }

  let html = `<p class="nar">Khi kết hợp biểu đồ ngày sinh và biểu đồ tên của <strong>${escapeHtml(name)}</strong>, chúng ta có được một bức tranh toàn diện hơn về năng lượng tổng hợp — nơi tên gọi có thể bổ sung những gì ngày sinh còn thiếu.</p>`;

  if (compensated.length > 0) {
    html += `<div class="arrow-block active-arrow">
      <div class="arrow-title arrow-has">🎉 Chúc mừng! Tên của bạn đã bổ sung các số còn thiếu:</div>
      <p class="nar">Các số <strong>${compensated.join(", ")}</strong> vốn vắng mặt trong biểu đồ ngày sinh đã được <strong>bổ sung từ năng lượng tên của bạn</strong>. Điều này rất quan trọng — tên gọi đóng vai trò "cẩm nang bổ trợ" cho những điểm yếu bẩm sinh của ngày sinh.</p>
    </div>`;
  }

  if (arrowsFromName.length > 0) {
    html += `<div class="arrow-block active-arrow">
      <div class="arrow-title arrow-has">✅ Tên của bạn đã tạo thêm ${arrowsFromName.length} mũi tên sức mạnh mới!</div>
      ${arrowsFromName
        .map(
          (a) =>
            `<p class="nar">• <strong>Trục ${a.name} (${a.code})</strong>: ${a.active
              .replace(/<div[\s\S]*?<\/div>/g, "")
              .replace(/<[^>]+>/g, "")
              .substring(0, 150)}...</p>`,
        )
        .join("")}
    </div>`;
  }

  if (isolated.length > 0) {
    html += `<div class="arrow-block missing-arrow">
      <div class="arrow-title arrow-no">⚠️ Các số lẻ loi (Ốc đảo cô đơn) trong biểu đồ ngày sinh:</div>
      <p class="nar">Các số <strong>${isolated.join(", ")}</strong> xuất hiện đơn lẻ trong biểu đồ ngày sinh — không được kết nối với bất kỳ mũi tên nào. Đây gọi là "số ốc đảo", nghĩa là năng lượng đó có nhưng chưa được phát huy đầy đủ tiềm năng của nó. Tên của bạn sẽ giúp kết nối và khởi động các "ốc đảo" này.</p>
    </div>`;
  }

  if (stillMissing.length > 0) {
    html += `<p class="nar" style="color:#7f1d1d;"><strong>⚠️ Các số vẫn còn thiếu sau khi kết hợp:</strong> ${stillMissing.join(", ")} — Đây là những bài học nghiệp (Karmic Lessons) sâu sắc nhất của bạn trong kiếp này, cần được chủ động phát triển thông qua trải nghiệm sống.</p>`;
  }

  return html;
}
