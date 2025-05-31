// src/pages/dashboard/index.tsx

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import SearchBar from "@/components/SearchBar";
import UserCard from "@/components/UserCard";
import LoadingSpinner from "@/components/Loadingspinner";
import ErrorMessage from "@/components/ErrorMessage";
import { getUsers } from "@/utils/api";
import type { User } from "@/types/User";

export default function DashboardPage() {
  // 1. State variables
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 2. Fetch the list of users on mount
  useEffect(() => {
    setLoading(true);
    getUsers()
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch users.");
        setUsers([]);
        setFilteredUsers([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // 3. Handler to filter users by name OR city
  const handleSearch = (query: string) => {
    const lowerQuery = query.toLowerCase().trim();
    if (lowerQuery === "") {
      // If search is empty, reset to full list
      setFilteredUsers(users);
      return;
    }
    const filtered = users.filter((u) => {
      return (
        u.name.toLowerCase().includes(lowerQuery) ||
        u.address.city.toLowerCase().includes(lowerQuery)
      );
    });
    setFilteredUsers(filtered);
  };

  return (
    <Layout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">User Dashboard</h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* 4. Loading State */}
      {loading && <LoadingSpinner />}

      {/* 5. Error State */}
      {error && <ErrorMessage message={error} />}

      {/* 6. When not loading and no error: display results or “No results found” */}
      {!loading && !error && (
        <>
          {filteredUsers.length === 0 ? (
            <p className="text-center text-gray-600">No users found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          )}
        </>
      )}
    </Layout>
  );
}
