import { getCurrentUser } from "@/services/user/user.actions";
import Link from "next/link";

export default async function DashboardPage() {
    const user = await getCurrentUser();

    return (
        <div className="space-y-8">
            {/* Header greeting */}
            <div className="p-6 bg-card-bg border border-card-border rounded-2xl shadow-xs">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                    Welcome back, {user?.name || "User"}! 👋
                </h1>
                <p className="text-sm text-text-muted mt-1">
                    Manage your GearUp activity, rentals, and profile settings here.
                </p>
            </div>

            {/* Role Specific Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {user?.role === "CUSTOMER" && (
                    <>
                        <div className="p-6 bg-card-bg border border-card-border rounded-2xl">
                            <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider">My Activity</h3>
                            <p className="text-2xl font-extrabold text-primary mt-2">Active Rentals</p>
                            <Link href="/dashboard/my-rentals" className="inline-block mt-4 text-xs font-semibold text-accent hover:underline">
                                View rental history →
                            </Link>
                        </div>
                    </>
                )}

                {user?.role === "PROVIDER" && (
                    <>
                        <div className="p-6 bg-card-bg border border-card-border rounded-2xl">
                            <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider">Inventory</h3>
                            <p className="text-2xl font-extrabold text-primary mt-2">Manage Gear</p>
                            <Link href="/dashboard/manage-gears" className="inline-block mt-4 text-xs font-semibold text-accent hover:underline">
                                Go to items list →
                            </Link>
                        </div>
                        <div className="p-6 bg-card-bg border border-card-border rounded-2xl">
                            <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider">Actions</h3>
                            <p className="text-2xl font-extrabold text-foreground mt-2">List New Gear</p>
                            <Link href="/dashboard/create-gears" className="inline-block mt-4 text-xs font-semibold text-primary hover:underline">
                                + Add product →
                            </Link>
                        </div>
                    </>
                )}

                {user?.role === "ADMIN" && (
                    <>
                        <div className="p-6 bg-card-bg border border-card-border rounded-2xl">
                            <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider">Administration</h3>
                            <p className="text-2xl font-extrabold text-primary mt-2">User Accounts</p>
                            <Link href="/dashboard/all-users" className="inline-block mt-4 text-xs font-semibold text-accent hover:underline">
                                Manage registered users →
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}