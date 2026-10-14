"use client";

import { useState } from "react";
import { Property, PropertyType, PropertyStatus } from "./types";

interface AddPropertyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddProperty: (newProperty: Property) => void;
}

const availableAmenities = [
    "Swimming Pool",
    "Backup Generator",
    "24/7 CCTV",
    "Borehole Water",
    "Equipped Gym",
    "High-speed Elevators",
    "Fiber Internet",
    "Electric Perimeter Fence",
    "Solar Water Heating",
    "Kids Play Area",
];

export default function AddPropertyModal({
    isOpen,
    onClose,
    onAddProperty,
}: AddPropertyModalProps) {
    const [name, setName] = useState("");
    const [type, setType] = useState<PropertyType>("Apartment");
    const [address, setAddress] = useState("");
    const [location, setLocation] = useState("Kilimani, Nairobi");
    const [totalUnits, setTotalUnits] = useState(24);
    const [occupiedUnits, setOccupiedUnits] = useState(20);
    const [monthlyRevenue, setMonthlyRevenue] = useState(1800000);
    const [averageRent, setAverageRent] = useState(75000);
    const [managerName, setManagerName] = useState("Jane Wanjiku");
    const [managerPhone, setManagerPhone] = useState("+254 700 123 456");
    const [description, setDescription] = useState("");
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
        "24/7 CCTV",
        "Backup Generator",
        "Borehole Water",
    ]);
    const [publicListing, setPublicListing] = useState(false);

    if (!isOpen) return null;

    const toggleAmenity = (amenity: string) => {
        setSelectedAmenities((prev) =>
            prev.includes(amenity)
                ? prev.filter((a) => a !== amenity)
                : [...prev, amenity]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const vacant = Math.max(0, totalUnits - occupiedUnits);
        let status: PropertyStatus = "partially_vacant";
        if (vacant === 0) status = "fully_occupied";

        const newProperty: Property = {
            id: `prop-${Date.now()}`,
            name: name || "New Luxury Property",
            type,
            address: address || "Riverside Drive",
            location,
            image: type === "Apartment" ? "/images/samples/apartment.png" :
                   type === "Bungalow" ? "/images/samples/bungalow.png" :
                   type === "Mansion" ? "/images/samples/mansion.png" :
                   "/images/samples/penthouse.png",
            totalUnits: Number(totalUnits) || 1,
            occupiedUnits: Number(occupiedUnits) || 0,
            vacantUnits: vacant,
            monthlyRevenue: Number(monthlyRevenue) || 0,
            averageRent: Number(averageRent) || 0,
            status,
            yearBuilt: 2026,
            manager: {
                name: managerName || "Jane Wanjiku",
                email: `${(managerName || "manager").toLowerCase().replace(/\s+/g, ".")}@myhome.ke`,
                phone: managerPhone || "+254 700 000 000",
            },
            amenities: selectedAmenities,
            description: description || "Modern residential estate offering prime amenities and secure living.",
            publicListing,
        };

        onAddProperty(newProperty);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal Dialog */}
            <div
                role="dialog"
                aria-labelledby="add-property-title"
                aria-modal="true"
                className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3.5 sm:px-6 sm:py-4">
                    <div>
                        <h2 id="add-property-title" className="font-outfit text-base sm:text-lg font-bold text-ink">
                            Add New Property
                        </h2>
                        <p className="text-xs text-neutral-500">
                            Register a new building, villa, or estate into your portfolio.
                        </p>
                    </div>
                    <button
                        type="button"
                        aria-label="Close dialog"
                        onClick={onClose}
                        className="flex size-8 items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-100 hover:text-ink"
                    >
                        ✕
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5 space-y-4">
                    {/* Basic details */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="block text-xs font-semibold text-neutral-700">
                                Property Name *
                            </label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Riverside Oasis Apartments"
                                className="mt-1.5 h-10 w-full rounded-lg border border-neutral-200 px-3 text-xs text-ink outline-none focus:border-jade-600 focus:ring-2 focus:ring-jade-600/15"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-neutral-700">
                                Property Type
                            </label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value as PropertyType)}
                                className="mt-1.5 h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-xs text-ink outline-none focus:border-jade-600 focus:ring-2 focus:ring-jade-600/15"
                            >
                                <option value="Apartment">Apartment</option>
                                <option value="Bungalow">Bungalow</option>
                                <option value="Penthouse">Penthouse</option>
                                <option value="Mansion">Mansion</option>
                                <option value="Townhouse">Townhouse</option>
                                <option value="Commercial">Commercial</option>
                            </select>
                        </div>
                    </div>

                    {/* Address & Neighborhood */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="block text-xs font-semibold text-neutral-700">
                                Street Address
                            </label>
                            <input
                                type="text"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="e.g. Riverside Drive"
                                className="mt-1.5 h-10 w-full rounded-lg border border-neutral-200 px-3 text-xs text-ink outline-none focus:border-jade-600 focus:ring-2 focus:ring-jade-600/15"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-neutral-700">
                                Neighborhood / County
                            </label>
                            <select
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="mt-1.5 h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-xs text-ink outline-none focus:border-jade-600 focus:ring-2 focus:ring-jade-600/15"
                            >
                                <option value="Kilimani, Nairobi">Kilimani, Nairobi</option>
                                <option value="Karen, Nairobi">Karen, Nairobi</option>
                                <option value="Westlands, Nairobi">Westlands, Nairobi</option>
                                <option value="Runda, Nairobi">Runda, Nairobi</option>
                                <option value="Lavington, Nairobi">Lavington, Nairobi</option>
                                <option value="Upper Hill, Nairobi">Upper Hill, Nairobi</option>
                                <option value="Kileleshwa, Nairobi">Kileleshwa, Nairobi</option>
                            </select>
                        </div>
                    </div>

                    {/* Units & Revenue numbers */}
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div>
                            <label className="block text-xs font-semibold text-neutral-700">
                                Total Units
                            </label>
                            <input
                                type="number"
                                min={1}
                                required
                                value={totalUnits}
                                onChange={(e) => setTotalUnits(Number(e.target.value))}
                                className="mt-1.5 h-10 w-full rounded-lg border border-neutral-200 px-3 text-xs text-ink outline-none focus:border-jade-600 focus:ring-2 focus:ring-jade-600/15"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-neutral-700">
                                Occupied Units
                            </label>
                            <input
                                type="number"
                                min={0}
                                max={totalUnits}
                                required
                                value={occupiedUnits}
                                onChange={(e) => setOccupiedUnits(Number(e.target.value))}
                                className="mt-1.5 h-10 w-full rounded-lg border border-neutral-200 px-3 text-xs text-ink outline-none focus:border-jade-600 focus:ring-2 focus:ring-jade-600/15"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-neutral-700">
                                Rent / Unit (KSh)
                            </label>
                            <input
                                type="number"
                                min={0}
                                value={averageRent}
                                onChange={(e) => setAverageRent(Number(e.target.value))}
                                className="mt-1.5 h-10 w-full rounded-lg border border-neutral-200 px-3 text-xs text-ink outline-none focus:border-jade-600 focus:ring-2 focus:ring-jade-600/15"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-neutral-700">
                                Total Rent Roll (KSh)
                            </label>
                            <input
                                type="number"
                                min={0}
                                value={monthlyRevenue}
                                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                                className="mt-1.5 h-10 w-full rounded-lg border border-neutral-200 px-3 text-xs text-ink outline-none focus:border-jade-600 focus:ring-2 focus:ring-jade-600/15"
                            />
                        </div>
                    </div>

                    {/* Manager Contact */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="block text-xs font-semibold text-neutral-700">
                                Manager Name
                            </label>
                            <input
                                type="text"
                                value={managerName}
                                onChange={(e) => setManagerName(e.target.value)}
                                className="mt-1.5 h-10 w-full rounded-lg border border-neutral-200 px-3 text-xs text-ink outline-none focus:border-jade-600 focus:ring-2 focus:ring-jade-600/15"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-neutral-700">
                                Manager Phone
                            </label>
                            <input
                                type="tel"
                                value={managerPhone}
                                onChange={(e) => setManagerPhone(e.target.value)}
                                className="mt-1.5 h-10 w-full rounded-lg border border-neutral-200 px-3 text-xs text-ink outline-none focus:border-jade-600 focus:ring-2 focus:ring-jade-600/15"
                            />
                        </div>
                    </div>

                    {/* Amenities Checkboxes */}
                    <div>
                        <label className="block text-xs font-semibold text-neutral-700">
                            Key Amenities
                        </label>
                        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                            {availableAmenities.map((amenity) => {
                                const selected = selectedAmenities.includes(amenity);
                                return (
                                    <button
                                        key={amenity}
                                        type="button"
                                        onClick={() => toggleAmenity(amenity)}
                                        className={`flex items-center gap-2 rounded-lg border p-2 text-left text-xs transition-colors ${
                                            selected
                                                ? "border-jade-600 bg-jade-50/70 text-jade-900 font-semibold"
                                                : "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
                                        }`}
                                    >
                                        <span
                                            className={`flex size-3.5 items-center justify-center rounded border ${
                                                selected
                                                    ? "border-jade-700 bg-jade-700 text-white"
                                                    : "border-neutral-300 bg-white"
                                            }`}
                                        >
                                            {selected && "✓"}
                                        </span>
                                        <span className="truncate">{amenity}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs font-semibold text-neutral-700">
                            Description & Notes
                        </label>
                        <textarea
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add brief details about the estate or handover status..."
                            className="mt-1.5 w-full rounded-lg border border-neutral-200 p-3 text-xs text-ink outline-none focus:border-jade-600 focus:ring-2 focus:ring-jade-600/15"
                        />
                    </div>

                    {/* Public Listing Toggle */}
                    <div className="rounded-xl border border-jade-200 bg-jade-50/60 p-4">
                        <div className="flex items-start gap-3">
                            <div className="relative mt-0.5 flex shrink-0 items-center">
                                <input
                                    id="public-listing"
                                    type="checkbox"
                                    checked={publicListing}
                                    onChange={(e) => setPublicListing(e.target.checked)}
                                    className="peer size-4 cursor-pointer appearance-none rounded border border-neutral-300 bg-white checked:border-jade-600 checked:bg-jade-600 focus:outline-none focus:ring-2 focus:ring-jade-600/20"
                                />
                                {publicListing && (
                                    <svg
                                        viewBox="0 0 12 12"
                                        fill="none"
                                        className="pointer-events-none absolute inset-0 m-auto size-2.5 text-white"
                                        aria-hidden="true"
                                    >
                                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </div>
                            <label htmlFor="public-listing" className="cursor-pointer">
                                <span className="block text-xs font-semibold text-jade-900">
                                    List publicly on feed
                                </span>
                                <span className="mt-0.5 block text-[11px] text-neutral-500">
                                    This property will appear on the public home feed for prospective tenants to discover and enquire about.
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Footer buttons */}
                    <div className="flex items-center justify-end gap-3 border-t border-neutral-100 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-neutral-200 px-4 py-2 text-xs font-semibold text-neutral-600 transition-colors hover:bg-neutral-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-lg bg-jade-700 px-5 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-jade-800"
                        >
                            Save Property
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

