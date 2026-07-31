import { cookies } from "next/headers";
import { jwtUtils } from "@/utils/jwt";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default async function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const decoded = accessToken ? jwtUtils.decodeToken(accessToken) : null;
    const isLoggedIn = !!accessToken && !!decoded;
    const userRole = decoded?.role || "CUSTOMER";

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar isLoggedIn={isLoggedIn} userRole={userRole} />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}