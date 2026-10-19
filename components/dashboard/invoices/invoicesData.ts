export type InvoiceStatus = "Paid" | "Sent" | "Overdue" | "Draft";

export interface InvoiceLineItem {
    description: string;
    quantity: number;
    unitPrice: number;
}

export interface Invoice {
    id: string;
    tenant: string;
    email: string;
    property: string;
    unit: string;
    owner: string;
    issuedAt: string;
    dueAt: string;
    status: InvoiceStatus;
    items: InvoiceLineItem[];
    note: string;
    attachmentName?: string;
}

// Static preview data; replace this fixture with API-backed invoice records later.
export const invoices: Invoice[] = [
    {
        id: "INV-2026-1048", tenant: "Amara Osei", email: "amara.osei@email.com", property: "Kilimani Heights", unit: "Apartment A-04", owner: "MyHome Property Management", issuedAt: "12 Oct 2026", dueAt: "20 Oct 2026", status: "Sent",
        items: [{ description: "Monthly rent · October 2026", quantity: 1, unitPrice: 65000 }, { description: "Water & waste service", quantity: 1, unitPrice: 2500 }], note: "Thank you for making Kilimani Heights your home.",
    },
    {
        id: "INV-2026-1047", tenant: "Cynthia Mwangi", email: "cynthia.mwangi@email.com", property: "Skyline Tower", unit: "18C", owner: "Skyline Residences Ltd", issuedAt: "1 Oct 2026", dueAt: "8 Oct 2026", status: "Overdue",
        items: [{ description: "Monthly rent · October 2026", quantity: 1, unitPrice: 320000 }, { description: "Parking space", quantity: 1, unitPrice: 12000 }], note: "Please contact your property manager if you need assistance.",
    },
    {
        id: "INV-2026-1046", tenant: "Brian Kamau", email: "brian.kamau@email.com", property: "Karen Gardens", unit: "B-12", owner: "Karen Gardens Management", issuedAt: "28 Sep 2026", dueAt: "5 Oct 2026", status: "Paid",
        items: [{ description: "Monthly rent · October 2026", quantity: 1, unitPrice: 180000 }, { description: "Service charge", quantity: 1, unitPrice: 8500 }], note: "Payment received with thanks.",
    },
    {
        id: "INV-2026-1045", tenant: "David Otieno", email: "david.otieno@email.com", property: "Grandview Estate", unit: "3-08", owner: "Grandview Estate Ltd", issuedAt: "25 Sep 2026", dueAt: "5 Oct 2026", status: "Paid",
        items: [{ description: "Monthly rent · October 2026", quantity: 1, unitPrice: 350000 }], note: "Payment received with thanks.",
    },
    {
        id: "INV-2026-1044", tenant: "Esther Njeri", email: "esther.njeri@email.com", property: "Azure Heights", unit: "2B", owner: "Azure Property Group", issuedAt: "18 Oct 2026", dueAt: "1 Nov 2026", status: "Draft",
        items: [{ description: "Monthly rent · November 2026", quantity: 1, unitPrice: 60000 }, { description: "Water & waste service", quantity: 1, unitPrice: 2000 }], note: "Draft invoice — review before sending.",
    },
    {
        id: "INV-2026-1043", tenant: "Farah Ali", email: "farah.ali@email.com", property: "Westlands Court", unit: "7-02", owner: "Westlands Court Management", issuedAt: "15 Sep 2026", dueAt: "1 Oct 2026", status: "Overdue",
        items: [{ description: "Monthly rent · October 2026", quantity: 1, unitPrice: 95000 }, { description: "Service charge", quantity: 1, unitPrice: 5000 }], note: "Please settle your balance at your earliest convenience.",
    },
    {
        id: "INV-2026-1042", tenant: "George Muli", email: "george.muli@email.com", property: "Riverside Residences", unit: "5A", owner: "Riverside Property Partners", issuedAt: "10 Sep 2026", dueAt: "1 Oct 2026", status: "Paid",
        items: [{ description: "Monthly rent · October 2026", quantity: 1, unitPrice: 240000 }, { description: "Parking space", quantity: 1, unitPrice: 10000 }], note: "Payment received with thanks.",
    },
];

export function getInvoiceTotal(invoice: Invoice) {
    return invoice.items.reduce((total, item) => total + item.quantity * item.unitPrice, 0);
}
