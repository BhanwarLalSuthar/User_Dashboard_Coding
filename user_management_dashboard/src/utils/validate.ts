export function isNotEmpty(value: string): boolean {
    return value.trim().length > 0
  }
  
  export function isValidEmail(email: string): boolean {
    // very simple regex for demonstration
    return /\S+@\S+\.\S+/.test(email)
  }
  