// Australian Business Number checksum validation.
// https://abr.business.gov.au/Help/AbnFormat
const WEIGHTS = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

export function cleanAbn(input: string): string {
  return input.replace(/\D/g, "");
}

export function isValidAbn(input: string): boolean {
  const abn = cleanAbn(input);
  if (abn.length !== 11) return false;
  const digits = abn.split("").map(Number);
  digits[0] -= 1;
  const sum = digits.reduce((acc, d, i) => acc + d * WEIGHTS[i], 0);
  return sum % 89 === 0;
}

export function formatAbn(input: string): string {
  const abn = cleanAbn(input);
  return `${abn.slice(0, 2)} ${abn.slice(2, 5)} ${abn.slice(5, 8)} ${abn.slice(8, 11)}`;
}
