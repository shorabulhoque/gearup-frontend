import { ThemeToggle } from "@/components/shared/ThemeToggle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background text-foreground transition-colors duration-300">
      <div className="p-8 rounded-xl border bg-card-bg border-card-border max-w-md w-full text-center space-y-4 shadow-sm">
        <div className="pt-2">
          <ThemeToggle />
        </div>
      </div>
    </main>
  );
};