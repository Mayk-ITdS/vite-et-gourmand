import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Optimise une URL d'image Unsplash via le CDN imgix (resize + format auto).
 * Une URL brute renvoie l'original (plusieurs Mo) ; on la cadre à la largeur
 * réellement affichée et on laisse Unsplash servir du WebP/AVIF compressé.
 * N'agit que sur les URLs Unsplash sans paramètres : les autres sont renvoyées telles quelles.
 */
export function optimizeImageUrl(url: string | undefined | null, width = 600): string {
  if (!url) return url ?? "";
  if (url.includes("images.unsplash.com") && !url.includes("?")) {
    return `${url}?w=${width}&q=70&auto=format&fit=crop`;
  }
  return url;
}
