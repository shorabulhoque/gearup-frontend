import Link from "next/link";
import LoginForm from "../_components/loginForm";

export default function LoginPage() {
    return (
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-4 bg-background text-foreground transition-colors duration-300">
            <div className="w-full max-w-md space-y-6">

                {/* Header Section */}
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-extrabold tracking-tight">Welcome Back!</h1>
                    <p className="text-sm opacity-70">
                        Enter your credentials to access your account
                    </p>
                </div>

                {/* Client Form Component */}
                <LoginForm />

                {/* Footer Links */}
                <p className="text-center text-sm opacity-80 pt-2">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/register"
                        className="text-primary font-semibold hover:underline ml-1"
                    >
                        Create an account
                    </Link>
                </p>

            </div>
        </div>
    );
}