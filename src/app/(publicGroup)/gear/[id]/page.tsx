// src/app/(publicGroup)/gear/[id]/page.tsx
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
                <Link href="/" className="hover:text-gray-900">Home</Link>
                <span>/</span>
                <Link href="/gear" className="hover:text-gray-900">Gears</Link>
                <span>/</span>
                <span className="text-gray-900 font-medium truncate">{gear.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left side: Picture and product description */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                        <Image
                            unoptimized
                            src={mainImage}
                            alt={gear.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div>
                        <div className="flex items-center space-x-3 mb-2">
                            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-md">
                                {gear.category?.name || "General"}
                            </span>
                            <span className="text-sm font-medium text-gray-500">
                                Brand: <strong className="text-gray-800">{gear.brand}</strong>
                            </span>
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{gear.title}</h1>
                        <p className="text-gray-600 leading-relaxed text-base whitespace-pre-line">
                            {gear.description}
                        </p>
                    </div>

                    {gear.category?.description && (
                        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 text-sm text-blue-900">
                            <strong className="block mb-1">About Category:</strong>
                            {gear.category.description}
                        </div>
                    )}
                </div>

                {/* Right side: Interactive rental card */}
                <div>
                    <GearBookingCard gear={gear} currentUser={currentUser} />
                </div>
            </div>
        </div>
    );
}