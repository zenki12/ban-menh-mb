export type TarotBirthProfile = {
  zodiac: string;
  element: "Lửa" | "Đất" | "Khí" | "Nước";
  energyNumber: number;
  generationGroup?: "Gen Z" | "Gen Y (Millennials)" | "Gen X" | "Trưởng thành";
  toneGuide?: string;
};

function calculateEnergyNumber(dob: string): number {
  let value = [...dob].reduce((sum, character) => sum + (Number(character) || 0), 0);
  while (value > 9 && ![11, 22, 33].includes(value)) {
    value = [...String(value)].reduce((sum, character) => sum + Number(character), 0);
  }
  return value;
}

export function calculateTarotBirthProfile(dob: string): TarotBirthProfile | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dob);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (parsed.getUTCFullYear() !== year || parsed.getUTCMonth() !== month - 1 || parsed.getUTCDate() !== day) return null;

  const zodiac = month === 1 && day <= 19 || month === 12 && day >= 22 ? ["Ma Kết", "Đất"]
    : month === 1 || month === 2 && day <= 18 ? ["Bảo Bình", "Khí"]
      : month === 2 || month === 3 && day <= 20 ? ["Song Ngư", "Nước"]
        : month === 3 || month === 4 && day <= 19 ? ["Bạch Dương", "Lửa"]
          : month === 4 || month === 5 && day <= 20 ? ["Kim Ngưu", "Đất"]
            : month === 5 || month === 6 && day <= 20 ? ["Song Tử", "Khí"]
              : month === 6 || month === 7 && day <= 22 ? ["Cự Giải", "Nước"]
                : month === 7 || month === 8 && day <= 22 ? ["Sư Tử", "Lửa"]
                  : month === 8 || month === 9 && day <= 22 ? ["Xử Nữ", "Đất"]
                    : month === 9 || month === 10 && day <= 22 ? ["Thiên Bình", "Khí"]
                      : month === 10 || month === 11 && day <= 21 ? ["Bọ Cạp", "Nước"]
                        : ["Nhân Mã", "Lửa"];

  let generationGroup: TarotBirthProfile["generationGroup"] = "Trưởng thành";
  let toneGuide = "Văn phong điềm tĩnh, sâu sắc, thực tế, tôn trọng và giàu tính chiêm nghiệm cuộc sống.";

  if (year >= 1997 && year <= 2012) {
    generationGroup = "Gen Z";
    toneGuide = "Văn phong gần gũi, hiện đại, thẳng thắn, tâm lý, dùng từ ngữ tự nhiên của giới trẻ (Gen Z), không lên gân hay dùng từ cổ xưa, nói trúng tâm lý lo âu, định hướng và cảm xúc thực tế.";
  } else if (year >= 1981 && year <= 1996) {
    generationGroup = "Gen Y (Millennials)";
    toneGuide = "Văn phong tinh tế, thực tế, cân bằng giữa cảm xúc và sự nghiệp/tài chính, nói trúng áp lực trưởng thành, trách nhiệm và tìm kiếm sự cân bằng nội tâm.";
  } else if (year >= 1965 && year <= 1980) {
    generationGroup = "Gen X";
    toneGuide = "Văn phong chín chắn, đĩnh đạc, thực tiễn, hướng về sự ổn định, gia đình và giá trị lâu dài.";
  }

  return {
    zodiac: zodiac[0],
    element: zodiac[1] as TarotBirthProfile["element"],
    energyNumber: calculateEnergyNumber(dob),
    generationGroup,
    toneGuide,
  };
}
