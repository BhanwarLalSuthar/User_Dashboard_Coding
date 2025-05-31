// src/components/UserCard.tsx

import type { User } from "../types/User";

type UserCardProps = {
  user: User;
};


export default function UserCard({ user }) {
    return (
      <div className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        <h2 className="text-xl font-semibold mb-1">{user.name}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <strong>Phone:</strong> {user.phone}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          <strong>City:</strong> {user.address.city}
        </p>
      </div>
    );
}
  