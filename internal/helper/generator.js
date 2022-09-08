import { customAlphabet } from "nanoid";

export const Generate = () => {
  const randomGenerate = customAlphabet("0123456789abcdefghijklmn", 5);
  return randomGenerate();
};
