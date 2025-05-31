// src/utils/api.ts

import type { User } from "../types/User";

export async function getUsers(): Promise<User[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return (await res.json()) as User[];
}
