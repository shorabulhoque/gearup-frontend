import { getCurrentUser } from "@/services/user/user.actions";
import { redirect } from "next/navigation";
import { ProfileClient } from "../_components/ProfileClient";

export default async function ProfilePage() {
    const user = await getCurrentUser();
    console.log(user);
    if (!user) {
        redirect("/login");
    }

    return <ProfileClient user={user} />;
}