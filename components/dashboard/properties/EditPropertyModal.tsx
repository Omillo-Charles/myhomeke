"use client";

import { useState } from "react";
import { Property, PropertyType, PropertyStatus } from "./types";

interface EditPropertyModalProps {
    property: Property | null;
    isOpen: boolean;
    onClose: () => void;
    onSaveProperty: (updatedProperty: Property) => void;
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

interface EditPropertyFormProps {
    property: Property;
    onClose: () => void;
    onSaveProperty: (updatedProperty: Property) => void;
}

function EditPropertyForm({ property, onClose, onSaveProperty }: EditPropertyFormProps) {
    const [name, setName] = useState(property.name);
    const [type, setType] = useState<PropertyType>(property.type);
    const [address, setAddress] = useState(property.address);
    const [location, setLocation] = useState(property.location);
    const [totalUnits, setTotalUnits] = useState(property.totalUnits);
    const [occupiedUnits, setOccupiedUnits] = useState(property.occupiedUnits);
    const [monthlyRevenue, setMonthlyRevenue] = useState(property.monthlyRevenue);
    const [averageRent, setAverageRent] = useState(property.averageRent);
    const [managerName, setManagerName] = useState(property.manager.name);
    const [managerPhone, setManagerPhone] = useState(property.manager.phone);
    const [description, setDescription] = useState(property.description);
    const [status, setStatus] = useState<PropertyStatus>(property.status);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>(property.amenities);

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
        let updatedStatus = status;
        if (vacant === 0 && status === "partially_vacant") {
            updatedStatus = "fully_occupied";
        }

        const updated: Property = {
            ...property,
            name: name || property.name,
            type,
            address: address || property.address,
            location,
            totalUnits: Number(totalUnits) || 1,
            occupiedUnits: Number(occupiedUnits) || 0,
            vacantUnits: vacant,
            monthlyRevenue: Number(monthlyRevenue) || 0,
            averageRent: Number(averageRent) || 0,
            status: updatedStatus,
            manager: {
                ...property.manager,
                name: managerName || property.manager.name,
                phone: managerPhone || property.manager.phone,
            },
            amenities: selectedAmenities,
            description: description || property.description,
        };

        onSaveProperty(updated);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
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

            {/* Status & Manager Contact */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                    <label className="block text-xs font-semibold text-neutral-700">
                        Operational Status
                    </label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as PropertyStatus)}
                        className="mt-1.5 h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-xs text-ink outline-none focus:border-jade-600 focus:ring-2 focus:ring-jade-600/15"
                    >
                        <option value="fully_occupied">Fully Occupied</option>
                        <option value="partially_vacant">Has Vacancies</option>
                        <option value="maintenance">Under Maintenance</option>
                        <option value="under_construction">Developing</option>
                    </select>
                </div>
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
                    className="mt-1.5 w-full rounded-lg border border-neutral-200 p-3 text-xs text-ink outline-none focus:border-jade-600 focus:ring-2 focus:ring-jade-600/15"
                />
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
                    Update Property
                </button>
            </div>
        </form>
    );
}

export default function EditPropertyModal({
    property,
    isOpen,
    onClose,
    onSaveProperty,
}: EditPropertyModalProps) {
    if (!isOpen || !property) return null;

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
                aria-labelledby="edit-property-title"
                aria-modal="true"
                className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
                    <div>
                        <h2 id="edit-property-title" className="font-outfit text-lg font-bold text-ink">
                            Edit Property
                        </h2>
                        <p className="text-xs text-neutral-500">
                            Update details, unit counts, rent roll, or manager contacts.
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

                <EditPropertyForm
                    key={property.id}
                    property={property}
                    onClose={onClose}
                    onSaveProperty={onSaveProperty}
                />
            </div>
        </div>
    );
}

