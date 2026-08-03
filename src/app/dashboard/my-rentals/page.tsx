import { getCurrentUser } from "@/services/user/user.actions";
import { getMyRentals } from "@/services/rental/rental.actions";
import { redirect } from "next/navigation";
import { MyRentalsClient } from "../_components/MyRentalsClient";


export default async function MyRentalsPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    };

    if (user.role !== "CUSTOMER") {
        redirect("/dashboard");
    };

    const rentals = await getMyRentals();

    return <MyRentalsClient rentals={rentals} />;
};