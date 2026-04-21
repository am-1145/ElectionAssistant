import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes dynamically using clsx and tailwind-merge.
 * Overrides conflicting tailwind classes properly.
 * 
 * @param {...(string|object|undefined|null|boolean)} inputs - Class names or objects
 * @returns {string} Merged class string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
