export const generateUsername = (fullname: string): string => {
  const base = fullname.toLowerCase().replace(/\s+/g, '').slice(0, 8);
  const randomStr = () => Math.random().toString(36).substring(2, 4); // 2 random letters/numbers
  const randomNum = Math.floor(Math.random() * 1000); // 0–999

  return `${base}${randomStr()}${randomNum}${randomStr()}`;
};
