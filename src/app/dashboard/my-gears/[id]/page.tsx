"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import GearForm, { GearFormData } from "@/app/dashboard/_components/GearForm";
import { getGearById, updateGear } from "@/services/gear/gear.actions";

export default function EditGearPage() {
    const params = useParams();
    const id = params.id as string;
    const [gearData, setGearData] = useState<GearFormData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGear = async () => {
            try {
                const res = await getGearById(id);
                if (res) {
                    setGearData({
                        title: res.title,
                        description: res.description,
                        brand: res.brand,
                        pricePerDay: res.pricePerDay,
                        stock: res.stock,
                        categoryId: res.category?.id as string,
                        images: res.images || [""],
                    });
                } else {
                    toast.error("Gear item not found.");
                }
            } catch (err) {
                toast.error("Failed to load gear details.");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchGear();
    }, [id]);

    const handleUpdate = async (data: GearFormData) => {
        console.log(data);
        return await updateGear(id, {
            ...data,
            pricePerDay: Number(data.pricePerDay),
            stock: Number(data.stock),
        });
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto p-8 text-center text-text-muted">
                Loading gear details...
            </div>
        );
    }

    if (!gearData) {
        return (
            <div className="max-w-4xl mx-auto p-8 text-center text-danger">
                Gear not found.
            </div>
        );
    }

    return (
        <GearForm
            initialData={gearData}
            onSubmit={handleUpdate}
            isEditMode={true}
        />
    );
}