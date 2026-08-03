import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { getCurrentUser } from "@/services/user/user.actions";

export default async function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentUser = await getCurrentUser();
    return (
        <div className="flex flex-col min-h-screen">
            {/* 2. Pass currentUser as a prop to Navbar */}
            <Navbar user={currentUser} />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
};