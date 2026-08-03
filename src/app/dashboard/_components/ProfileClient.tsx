"use client";

import { IUserData } from "@/types/user.types";

interface ProfileClientProps {
    user: IUserData;
}

export function ProfileClient({ user }: ProfileClientProps) {
    const getRoleBadge = (role: string) => {
        switch (role) {
            case "ADMIN":
                return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
            case "PROVIDER":
                return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
            default:
                return "bg-primary/10 text-primary border-primary/20";
        }
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
                    <h1 className="text-2xl font-bold text-foreground">Account Profile</h1>
                    <p className="text-sm text-text-muted mt-1">
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

            <div className="bg-card-bg border border-card-border rounded-2xl shadow-xs overflow-hidden transition-colors duration-300">
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-primary to-accent h-32 px-8 flex items-end">
                    <div className="translate-y-8 flex items-center space-x-4">
                        <div className="w-20 h-20 rounded-full bg-card-bg border-4 border-card-border shadow-md flex items-center justify-center text-2xl font-extrabold text-primary uppercase">
                            {user?.name ? user.name.charAt(0) : "U"}
                        </div>
                    </div>
                </div>

                <div className="pt-12 px-8 pb-8 space-y-6">
                    <div>
                        <h2 className="text-xl font-bold text-foreground">{user?.name || "User"}</h2>
                        <p className="text-sm text-text-muted">{user?.email}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-card-border">
                        {/* Full Name */}
                        <div className="bg-background p-4 rounded-xl border border-card-border">
                            <span className="block text-xs font-semibold text-text-muted uppercase tracking-wider">
                                Full Name
                            </span>
                            <p className="text-sm font-semibold text-foreground mt-1">
                                {user?.name || "N/A"}
                            </p>
                        </div>

                        {/* Email Address */}
                        <div className="bg-background p-4 rounded-xl border border-card-border">
                            <span className="block text-xs font-semibold text-text-muted uppercase tracking-wider">
                                Email Address
                            </span>
                            <p className="text-sm font-semibold text-foreground mt-1">
                                {user?.email}
                            </p>
                        </div>

                        {/* Role */}
                        <div className="bg-background p-4 rounded-xl border border-card-border">
                            <span className="block text-xs font-semibold text-text-muted uppercase tracking-wider">
                                Role
                            </span>
                            <p className="text-sm font-semibold text-foreground mt-1">
                                {user?.role}
                            </p>
                        </div>

                        {/* Member Since */}
                        <div className="bg-background p-4 rounded-xl border border-card-border">
                            <span className="block text-xs font-semibold text-text-muted uppercase tracking-wider">
                                Member Since
                            </span>
                            <p className="text-sm font-semibold text-foreground mt-1">
                                {memberSince}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}