import { calculateTarotBirthProfile } from "../apps/web/src/lib/tarot/tarot-birth-profile.ts";

const actual = calculateTarotBirthProfile("1997-07-20");
const expected = { zodiac: "Cự Giải", element: "Nước", energyNumber: 8 };

if (JSON.stringify(actual) !== JSON.stringify(expected)) {
  throw new Error(`Kết quả ngày sinh không đúng: ${JSON.stringify(actual)}`);
}

console.log(JSON.stringify(actual));
