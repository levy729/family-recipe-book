import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleTagClick(
  tag: string,
  router: any,
  event?: React.MouseEvent
) {
  event?.stopPropagation();
  event?.preventDefault();
  router.push(`/search?q=${encodeURIComponent(tag)}`);
  return false;
}
