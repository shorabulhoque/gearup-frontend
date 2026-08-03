"use client";

import { IUserData } from "@/types/user.types";

interface ProfileClientProps {
    user: IUserData;
};

export function ProfileClient({ user }: ProfileClientProps) {
    const getRoleBadge = (role: string) => {
        switch (role) {
            case "ADMIN":
                return "bg-purple-100 text-purple-800 border-purple-200";
            case "PROVIDER":
                return "bg-amber-100 text-amber-800 border-amber-200";
            default:
                return "bg-blue-100 text-blue-800 border-blue-200";
        };
    };

    const memberSince = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
        })
        : "N/A";

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Account Profile</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        View your personal details and account role.
                    </p>
                </div>
                <span
                    className={`px-3.5 py-1 text-xs font-bold rounded-full border ${getRoleBadge(
                        user.role
                    )}`}
                >
                    {user.role}
                </span>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-32 px-8 flex items-end">
                    <div className="translate-y-8 flex items-center space-x-4">
                        <div className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center text-2xl font-bold text-blue-600 uppercase">
                            {user?.name ? user.name.charAt(0) : "U"}
                        </div>
                    </div>
                </div>

                <div className="pt-12 px-8 pb-8 space-y-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{user?.name || "User"}</h2>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                        {/* Full Name */}
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Full Name
                            </span>
                            <p className="text-sm font-semibold text-gray-800 mt-1">
                                {user?.name || "N/A"}
                            </p>
                        </div>

                        {/* Email Address */}
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Email Address
                            </span>
                            <p className="text-sm font-semibold text-gray-800 mt-1">
                                {user?.email}
                            </p>
                        </div>

                        {/* Role */}
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Role
                            </span>
                            <p className="text-sm font-semibold text-gray-800 mt-1">
                                {user?.role}
                            </p>
                        </div>

                        {/* Member Since */}
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Member Since
                            </span>
                            <p className="text-sm font-semibold text-gray-800 mt-1">
                                {memberSince}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}