import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGearById } from "@/services/gear/gear.actions";
import { getCurrentUser } from "@/services/user/user.actions";
import GearBookingCard from "../../_components/GearBookingCard";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function PublicGearSinglePage({ params }: PageProps) {
    const { id } = await params;

    const [gear, currentUser] = await Promise.all([
        getGearById(id),
        getCurrentUser(),
    ]);

    if (!gear) {
        notFound();
    }

    const defaultImage =
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop";
    const mainImage = gear.images && gear.images.length > 0 ? gear.images[0] : defaultImage;

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Modern Breadcrumb */}
                <nav className="flex items-center space-x-2 text-sm text-text-muted mb-8">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/gear" className="hover:text-primary transition-colors">Gears</Link>
                    <span>/</span>
                    <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-xs">{gear.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left side: Picture and product description */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="relative w-full h-[350px] sm:h-[450px] rounded-2xl overflow-hidden bg-card-bg border border-card-border shadow-sm">
                            <Image
                                unoptimized
                                src={mainImage}
                                alt={gear.title}
                                fill
                                className="object-cover transition-transform duration-500 hover:scale-105"
                                priority
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full border border-accent/20">
                                    {gear.category?.name || "General"}
                                </span>
                                <span className="text-sm font-medium text-text-muted">
                                    Brand: <strong className="text-foreground">{gear.brand}</strong>
                                </span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                                {gear.title}
                            </h1>

                            <div className="border-t border-card-border pt-4">
                                <h3 className="text-lg font-semibold text-foreground mb-2">Description</h3>
                                <p className="text-text-muted leading-relaxed text-base whitespace-pre-line">
                                    {gear.description}
                                </p>
                            </div>
                        </div>

                        {gear.category?.description && (
                            <div className="bg-card-bg border border-card-border rounded-xl p-5 text-sm text-foreground space-y-1">
                                <strong className="block font-semibold text-accent">About Category:</strong>
                                <p className="text-text-muted">{gear.category.description}</p>
                            </div>
                        )}
                    </div>

                    {/* Right side: Interactive rental card */}
                    <div>
                        <GearBookingCard gear={gear} currentUser={currentUser} />
                    </div>
                </div>
            </div>
        </div>
    );
}