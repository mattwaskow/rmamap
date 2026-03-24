export const currency = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(
    n
  );

export const percent = (n: number, digits = 2) => `${n.toFixed(digits)}%`;

export const numberFmt = (n: number) => new Intl.NumberFormat('en-US').format(n);
