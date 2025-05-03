
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(firstName?: string | null, lastName?: string | null): string {
  let initials = '';
  
  if (firstName) {
    initials += firstName.charAt(0).toUpperCase();
  }
  
  if (lastName) {
    initials += lastName.charAt(0).toUpperCase();
  }
  
  return initials || '?';
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function getRelativeTime(date: string | Date): string {
  const now = new Date();
  const pastDate = new Date(date);
  const diffInMs = now.getTime() - pastDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) {
    return "aujourd'hui";
  } else if (diffInDays === 1) {
    return "hier";
  } else if (diffInDays < 7) {
    return `il y a ${diffInDays} jours`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `il y a ${weeks} ${weeks === 1 ? 'semaine' : 'semaines'}`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `il y a ${months} ${months === 1 ? 'mois' : 'mois'}`;
  } else {
    const years = Math.floor(diffInDays / 365);
    return `il y a ${years} ${years === 1 ? 'an' : 'ans'}`;
  }
}
