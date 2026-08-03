import { getCurrentUser } from "@/services/user/user.actions";
import { redirect } from "next/navigation";
import DashboardSidebar from "./_components/DashboardSidebar";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="flex min-h-screen bg-background text-foreground transition-colors duration-300">
            {/* Theme-integrated Sidebar */}
            <DashboardSidebar role={user.role} userName={user.name} />

            {/* Main Scrollable Content Panel */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto min-w-0">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}