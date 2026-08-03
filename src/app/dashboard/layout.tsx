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
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <DashboardSidebar role={user.role} userName={user.name} />
            <main className="flex-1 p-8 overflow-y-auto">{children}</main>
        </div>
    );
};