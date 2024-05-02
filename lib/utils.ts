import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PYG',
    minimumFractionDigits: 0,
  }).format(price);
}

export function capitalizeFirstLetter(string: string | undefined | null) {
  if (string === null || string === undefined) return '';

  return string.charAt(0).toUpperCase() + string.slice(1);
}
