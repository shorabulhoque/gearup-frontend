import Link from "next/link";
import RegisterForm from "../_components/registerForm";

export default function RegisterPage() {
    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="space-y-2 text-center">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                    Create an Account
                </h1>
                <p className="text-xs sm:text-sm text-text-muted">
                    Join us to rent or host your outdoor gear
                </p>
            </div>

            {/* Client Form Component */}
            <RegisterForm />

            {/* Footer Links */}
            <p className="text-center text-xs sm:text-sm text-text-muted pt-2">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="text-primary font-bold hover:underline ml-1 transition-colors"
                >
                    Log in
                </Link>
            </p>
        </div>
    );
}