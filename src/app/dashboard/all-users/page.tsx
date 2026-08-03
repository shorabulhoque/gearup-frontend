/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { getAllUsers, updateUserStatus } from "@/services/admin/admin.actions";
import { IUserData } from "@/types/user.types";

export default function AllUsersPage() {
    const [users, setUsers] = useState<IUserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    // Search and Pagination states
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState({ total: 0, totalPage: 1, limit: 10 });

    // Debounce search term to avoid hitting API on every keystroke
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setPage(1); // Reset to first page on search change
        }, 400);

        return () => clearTimeout(handler);
    }, [searchTerm]);

    // Fetch users function
    const loadUsers = useCallback(async () => {
        setLoading(true);
        const res = await getAllUsers({ searchTerm: debouncedSearch, page, limit: 10 });

        if (res.success) {
            setUsers(res.data);
            if (res.meta) {
                setMeta(res.meta);
            }
        } else {
            toast.error(res.message || "Failed to fetch users.");
        }
        setLoading(false);
    }, [debouncedSearch, page]);

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    // Toggle user status
    const handleToggleStatus = async (user: IUserData) => {
        const newStatus = user.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
        setUpdatingId(user.id);

        const res = await updateUserStatus(user.id, newStatus);
        setUpdatingId(null);

        if (res.success) {
            toast.success(res.message);
            setUsers((prev) =>
                prev.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u))
            );
        } else {
            toast.error(res.message);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6 text-foreground bg-background min-h-screen">
            {/* Page Header & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-card-border pb-4">
                <div>
                    <h1 className="text-2xl font-extrabold tracking-tight">User Management</h1>
                    <p className="text-xs sm:text-sm text-text-muted mt-1">
                        Inspect registered users, perform searches, and toggle user permissions.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="w-full sm:w-72">
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 text-xs rounded-xl border border-card-border bg-card-bg text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                </div>
            </div>

            {/* Content Table */}
            {loading ? (
                <div className="p-12 text-center text-text-muted bg-card-bg border border-card-border rounded-2xl">
                    Loading users list...
                </div>
            ) : users.length === 0 ? (
                <div className="p-12 text-center text-text-muted bg-card-bg border border-card-border rounded-2xl">
                    No users matching your criteria.
                </div>
            ) : (
                <div className="bg-card-bg border border-card-border rounded-2xl overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead>
                                <tr className="border-b border-card-border bg-background/50 text-text-muted uppercase text-[11px] font-semibold tracking-wider">
                                    <th className="p-4">User</th>
                                    <th className="p-4">Role</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Joined Date</th>
                                    <th className="p-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-card-border/60">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-background/40 transition-colors">
                                        <td className="p-4">
                                            <div className="font-semibold text-foreground">{user.name}</div>
                                            <div className="text-xs text-text-muted">{user.email}</div>
                                        </td>
                                        <td className="p-4">
                                            <span
                                                className={`inline-block px-2.5 py-0.5 text-[11px] font-bold rounded-md uppercase tracking-wider ${user.role === "ADMIN"
                                                    ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                                                    : user.role === "PROVIDER"
                                                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                                        : "bg-gray-500/10 text-gray-400 border border-gray-500/20"
                                                    }`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold rounded-full ${user.status === "ACTIVE"
                                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                                    : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                                    }`}
                                            >
                                                <span
                                                    className={`w-1.5 h-1.5 rounded-full ${user.status === "ACTIVE" ? "bg-emerald-400" : "bg-rose-400"
                                                        }`}
                                                />
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-xs text-text-muted">
                                            {new Date(user.createdAt).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </td>
                                        <td className="p-4 text-right">
                                            <button
                                                onClick={() => handleToggleStatus(user)}
                                                disabled={updatingId === user.id}
                                                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all disabled:opacity-50 cursor-pointer ${user.status === "SUSPENDED"
                                                    ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30"
                                                    : "bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30"
                                                    }`}
                                            >
                                                {updatingId === user.id
                                                    ? "Updating..."
                                                    : user.status === "SUSPENDED"
                                                        ? "Activate"
                                                        : "Suspend"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Bar */}
                    <div className="p-4 border-t border-card-border bg-background/30 flex items-center justify-between text-xs text-text-muted">
                        <div>
                            Total Users: <span className="font-bold text-foreground">{meta.total}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-3 py-1.5 rounded-lg border border-card-border bg-card-bg hover:bg-card-border disabled:opacity-40 transition-colors cursor-pointer"
                            >
                                Previous
                            </button>
                            <span>
                                Page <strong className="text-foreground">{page}</strong> of{" "}
                                <strong className="text-foreground">{meta.totalPage || 1}</strong>
                            </span>
                            <button
                                onClick={() => setPage((p) => Math.min(meta.totalPage, p + 1))}
                                disabled={page >= meta.totalPage}
                                className="px-3 py-1.5 rounded-lg border border-card-border bg-card-bg hover:bg-card-border disabled:opacity-40 transition-colors cursor-pointer"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}