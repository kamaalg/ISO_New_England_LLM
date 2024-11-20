import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Utility function to merge class names */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Fetch utility with error handling */
interface ApplicationError extends Error {
  info: string;
  status: number;
}

export const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error(
      'An error occurred while fetching the data.',
    ) as ApplicationError;

    error.info = await res.json();
    error.status = res.status;

    throw error;
  }

  return res.json();
};

/** Utility to retrieve data from localStorage */
export function getLocalStorage(key: string) {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem(key) || '[]');
  }
  return [];
}

/** Generate a UUID */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/** Sanitize user messages for display */
export function sanitizeUIMessages(messages: Array<{ content: string }>): Array<{ content: string }> {
  return messages.filter((message) => message.content.trim().length > 0);
}

/** Retrieve the most recent user message */
export function getMostRecentUserMessage(messages: Array<{ role: string; content: string }>) {
  const userMessages = messages.filter((message) => message.role === 'user');
  return userMessages.at(-1);
}