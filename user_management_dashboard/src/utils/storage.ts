// src/utils/storage.ts

const FORM_DATA_KEY = "addUserFormData";

/**
 * Save an arbitrary object to localStorage under FORM_DATA_KEY.
 */
export interface StoredFormData {
  [key: string]: string; // each value is a string
}

export function saveFormData(data: StoredFormData): void {
  try {
    localStorage.setItem(FORM_DATA_KEY, JSON.stringify(data));
  } catch {
    // fail silently; localStorage might not be available (SSR, etc.)
  }
}

/**
 * Load the saved form data (if any) from localStorage.
 * Returns null if nothing is saved or JSON.parse fails.
 */
export function loadFormData(): StoredFormData | null {
  try {
    const raw = localStorage.getItem(FORM_DATA_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Clear the saved form data from localStorage.
 */
export function clearFormData(): void {
  try {
    localStorage.removeItem(FORM_DATA_KEY);
  } catch {
    // ignore
  }
}
