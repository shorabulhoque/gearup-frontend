import Link from "next/link";
import LoginForm from "../_components/loginForm";

export default function LoginPage() {
    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="space-y-2 text-center">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                    Welcome Back!
                </h1>
                <p className="text-xs sm:text-sm text-text-muted">
                    Enter your credentials to access your account
                </p>
            </div>

            {/* Client Form Component */}
            <LoginForm />

            {/* Footer Links */}
            <p className="text-center text-xs sm:text-sm text-text-muted pt-2">
                Don&apos;t have an account?{" "}
                <Link
                    href="/register"
                    className="text-primary font-bold hover:underline ml-1 transition-colors"
                >
                    Create an account
                </Link>
            </p>
        </div>
    );
}