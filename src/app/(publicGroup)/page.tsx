// src/app/page.tsx
import FeaturedGear from "@/components/featur/FeaturedGear";
import Hero from "@/components/hero/Hero";
import Review from "@/components/review/Review";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground transition-colors duration-300 font-sans antialiased">
      <Hero />
      <FeaturedGear />
      <Review />
    </main>
  );
}