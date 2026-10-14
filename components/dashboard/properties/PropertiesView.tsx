"use client";

import { useMemo, useState } from "react";
import { FilterStatus, Property, PropertyType, SortOption, ViewMode } from "./types";
import { initialProperties } from "./propertiesData";
import PropertiesHeader from "./PropertiesHeader";
import PropertiesStats from "./PropertiesStats";
import PropertiesFilterBar from "./PropertiesFilterBar";
import PropertiesGrid from "./PropertiesGrid";
import PropertiesTable from "./PropertiesTable";
import AddPropertyModal from "./AddPropertyModal";
import EditPropertyModal from "./EditPropertyModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

export default function PropertiesView() {
    const [properties, setProperties] = useState<Property[]>(initialProperties);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
    const [typeFilter, setTypeFilter] = useState<string>("all");
    const [locationFilter, setLocationFilter] = useState<string>("all");
    const [sortBy, setSortBy] = useState<SortOption>("name_asc");
    const [viewMode, setViewMode] = useState<ViewMode>("grid");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingProperty, setEditingProperty] = useState<Property | null>(null);
    const [deletingProperty, setDeletingProperty] = useState<Property | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Dynamic unique locations and types for the dropdowns
    const availableLocations = useMemo(() => {
        const set = new Set<string>();
        properties.forEach((p) => set.add(p.location));
        return Array.from(set);
    }, [properties]);

    const availableTypes = useMemo(() => {
        const set = new Set<PropertyType>();
        properties.forEach((p) => set.add(p.type));
        return Array.from(set);
    }, [properties]);

    // Status counts for the tabs
    const statusCounts = useMemo(() => {
        return {
            all: properties.length,
            fully_occupied: properties.filter((p) => p.status === "fully_occupied").length,
            partially_vacant: properties.filter((p) => p.status === "partially_vacant").length,
            maintenance: properties.filter((p) => p.status === "maintenance").length,
            under_construction: properties.filter((p) => p.status === "under_construction").length,
        };
    }, [properties]);

    // Filter and sort properties
    const filteredProperties = useMemo(() => {
        return properties
            .filter((p) => {
                // Status tab
                if (statusFilter !== "all" && p.status !== statusFilter) {
                    return false;
                }

                // Property type
                if (typeFilter !== "all" && p.type !== typeFilter) {
                    return false;
                }

                // Location
                if (locationFilter !== "all" && p.location !== locationFilter) {
                    return false;
                }

                // Search query
                if (searchQuery.trim() !== "") {
                    const q = searchQuery.toLowerCase();
                    const matchesName = p.name.toLowerCase().includes(q);
                    const matchesAddress = p.address.toLowerCase().includes(q);
                    const matchesLocation = p.location.toLowerCase().includes(q);
                    const matchesManager = p.manager.name.toLowerCase().includes(q);
                    if (!matchesName && !matchesAddress && !matchesLocation && !matchesManager) {
                        return false;
                    }
                }

                return true;
            })
            .sort((a, b) => {
                if (sortBy === "name_asc") {
                    return a.name.localeCompare(b.name);
                }
                if (sortBy === "units_desc") {
                    return b.totalUnits - a.totalUnits;
                }
                if (sortBy === "occupancy_desc") {
                    const occA = a.occupiedUnits / a.totalUnits;
                    const occB = b.occupiedUnits / b.totalUnits;
                    return occB - occA;
                }
                if (sortBy === "revenue_desc") {
                    return b.monthlyRevenue - a.monthlyRevenue;
                }
                return 0;
            });
    }, [properties, statusFilter, typeFilter, locationFilter, searchQuery, sortBy]);

    const handleAddProperty = (newProp: Property) => {
        setProperties((prev) => [newProp, ...prev]);
        setToastMessage(`"${newProp.name}" added successfully to portfolio.`);
        setTimeout(() => setToastMessage(null), 4000);
    };

    const handleSaveEditedProperty = (updated: Property) => {
        setProperties((prev) =>
            prev.map((p) => (p.id === updated.id ? updated : p))
        );
        setToastMessage(`"${updated.name}" updated successfully.`);
        setTimeout(() => setToastMessage(null), 4000);
    };

    const handleConfirmDelete = (propertyId: string) => {
        const toDelete = properties.find((p) => p.id === propertyId);
        setProperties((prev) => prev.filter((p) => p.id !== propertyId));
        if (toDelete) {
            setToastMessage(`"${toDelete.name}" deleted from portfolio.`);
            setTimeout(() => setToastMessage(null), 4000);
        }
    };

    const handleResetFilters = () => {
        setSearchQuery("");
        setStatusFilter("all");
        setTypeFilter("all");
        setLocationFilter("all");
        setSortBy("name_asc");
    };

    return (
        <div className="space-y-6">
            {/* Toast Notification */}
            {toastMessage && (
                <div
                    role="alert"
                    className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-jade-200 bg-jade-800 px-4 py-3 text-xs font-semibold text-white shadow-xl transition-all"
                >
                    <span className="flex size-5 items-center justify-center rounded-full bg-white text-jade-800 text-[11px] font-bold">
                        ✓
                    </span>
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Properties Header */}
            <PropertiesHeader
                onOpenAddModal={() => setIsAddModalOpen(true)}
                totalCount={properties.length}
            />

            {/* KPI Summary Stats */}
            <PropertiesStats properties={properties} />

            {/* Filters Bar */}
            <PropertiesFilterBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                typeFilter={typeFilter}
                onTypeChange={setTypeFilter}
                locationFilter={locationFilter}
                onLocationChange={setLocationFilter}
                sortBy={sortBy}
                onSortChange={setSortBy}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                statusCounts={statusCounts}
                availableLocations={availableLocations}
                availableTypes={availableTypes}
            />

            {/* Results count indicator if filtered */}
            {(searchQuery || statusFilter !== "all" || typeFilter !== "all" || locationFilter !== "all") && (
                <div className="flex items-center justify-between text-xs text-neutral-500">
                    <p>
                        Showing <strong className="text-ink">{filteredProperties.length}</strong> of{" "}
                        {properties.length} properties
                    </p>
                    <button
                        type="button"
                        onClick={handleResetFilters}
                        className="font-semibold text-jade-700 underline decoration-gold-400 underline-offset-2 hover:text-jade-900"
                    >
                        Clear all filters
                    </button>
                </div>
            )}

            {/* Grid or Table display */}
            {viewMode === "grid" ? (
                <PropertiesGrid
                    properties={filteredProperties}
                    onResetFilters={handleResetFilters}
                    onEdit={(prop) => setEditingProperty(prop)}
                    onDelete={(prop) => setDeletingProperty(prop)}
                />
            ) : (
                <PropertiesTable
                    properties={filteredProperties}
                    onResetFilters={handleResetFilters}
                    onEdit={(prop) => setEditingProperty(prop)}
                    onDelete={(prop) => setDeletingProperty(prop)}
                />
            )}

            {/* Add Property Modal */}
            <AddPropertyModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAddProperty={handleAddProperty}
            />

            {/* Edit Property Modal */}
            <EditPropertyModal
                property={editingProperty}
                isOpen={!!editingProperty}
                onClose={() => setEditingProperty(null)}
                onSaveProperty={handleSaveEditedProperty}
            />

            {/* Delete Confirmation Modal */}
            <DeleteConfirmModal
                property={deletingProperty}
                isOpen={!!deletingProperty}
                onClose={() => setDeletingProperty(null)}
                onConfirmDelete={handleConfirmDelete}
            />
        </div>
    );
}
