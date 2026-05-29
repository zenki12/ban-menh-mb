export type AspectConfig = {
  icon: string;
  title: string;
  fields: string[];
};

export const ASPECT_CONFIG: AspectConfig[] = [
  { icon: "💑", title: "Tình yêu & Hôn nhân", fields: ["love", "relationship", "relationship_style", "in_relationship"] },
  { icon: "💼", title: "Sự nghiệp", fields: ["career", "career_fit"] },
  { icon: "💰", title: "Tài chính", fields: ["finance", "money_style"] },
  { icon: "🤝", title: "Giao tiếp xã hội", fields: ["first_impression", "how_others_see", "perception", "first_vibe"] },
  { icon: "📚", title: "Học tập", fields: ["study", "growth_path"] },
  { icon: "👨‍👩‍👧", title: "Gia đình", fields: ["parenting_style", "family"] },
  { icon: "🌿", title: "Sức khỏe", fields: ["health"] },
  { icon: "💡", title: "Lời khuyên", fields: ["advice"] },
  { icon: "🎯", title: "Sứ mệnh & Định hướng", fields: ["mission", "growth_path", "direction"] },
  { icon: "⚠️", title: "Cần lưu ý", fields: ["weaknesses", "blind_spot", "warning", "trap"] },
  { icon: "✨", title: "Điểm mạnh nổi bật", fields: ["strengths", "strength", "positive", "gift"] },
];

export function readAspectText(data: Record<string, unknown>, fields: string[]): string {
  for (const key of fields) {
    const value = data[key];
    if (Array.isArray(value)) {
      const items = value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
      if (items.length) return items.join(", ");
    }
    if (typeof value === "string" && value.trim()) return value;
  }
  return "";
}
