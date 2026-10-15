export type PaymentChannel = "M-PESA" | "Airtel Money" | "Bank" | "PayPal";
export type PaymentStatus = "Completed" | "Pending" | "Failed" | "Refunded";

export interface Payment {
    id: string;
    reference: string;
    tenant: string;
    property: string;
    channel: PaymentChannel;
    paymentDetail: string;
    amount: number;
    paidAt: string;
    status: PaymentStatus;
}

// Sample transactions for the payments dashboard UI. Replace with API data later.
export const payments: Payment[] = [
    {
        id: "PAY-10482",
        reference: "QK72M9R4X1",
        tenant: "Amara Osei",
        property: "Kilimani Heights · A-04",
        channel: "M-PESA",
        paymentDetail: "+254 712 345 678",
        amount: 65000,
        paidAt: "15 Oct 2026, 09:42",
        status: "Completed",
    },
    {
        id: "PAY-10481",
        reference: "AT-88429176",
        tenant: "Brian Kamau",
        property: "Karen Gardens · B-12",
        channel: "Bank",
        paymentDetail: "KCB Bank ·•• 4821",
        amount: 180000,
        paidAt: "15 Oct 2026, 08:16",
        status: "Completed",
    },
    {
        id: "PAY-10480",
        reference: "PP-7G4K91",
        tenant: "Cynthia Mwangi",
        property: "Skyline Tower · 18C",
        channel: "PayPal",
        paymentDetail: "cynthia.mwangi@email.com",
        amount: 320000,
        paidAt: "14 Oct 2026, 16:03",
        status: "Pending",
    },
    {
        id: "PAY-10479",
        reference: "CL9X1P5J8B",
        tenant: "David Otieno",
        property: "Grandview Estate · 3-08",
        channel: "M-PESA",
        paymentDetail: "+254 722 980 114",
        amount: 35000,
        paidAt: "14 Sep 2026, 13:28",
        status: "Completed",
    },
    {
        id: "PAY-10478",
        reference: "AM-65100319",
        tenant: "Esther Njeri",
        property: "Azure Heights · 2B",
        channel: "Airtel Money",
        paymentDetail: "+254 733 440 221",
        amount: 60000,
        paidAt: "14 Aug 2026, 11:54",
        status: "Failed",
    },
    {
        id: "PAY-10477",
        reference: "EQ-036571824",
        tenant: "Farah Ali",
        property: "Westlands Court · 7-02",
        channel: "Bank",
        paymentDetail: "Equity Bank ·•• 1190",
        amount: 95000,
        paidAt: "13 Sep 2026, 15:37",
        status: "Completed",
    },
    {
        id: "PAY-10476",
        reference: "BK-20261013-019",
        tenant: "George Muli",
        property: "Riverside Residences · 5A",
        channel: "Bank",
        paymentDetail: "Co-operative Bank ·•• 7004",
        amount: 240000,
        paidAt: "13 Aug 2026, 10:21",
        status: "Completed",
    },
    {
        id: "PAY-10475",
        reference: "MP4W8N2JQ6",
        tenant: "Hannah Wairimu",
        property: "Kilimani Heights · C-11",
        channel: "M-PESA",
        paymentDetail: "+254 711 553 204",
        amount: 85000,
        paidAt: "12 Jul 2026, 17:49",
        status: "Refunded",
    },
    {
        id: "PAY-10474",
        reference: "PP-2B9F30",
        tenant: "Ibrahim Noor",
        property: "Lavington Park · 9-01",
        channel: "PayPal",
        paymentDetail: "ibrahim.noor@email.com",
        amount: 125000,
        paidAt: "12 Jul 2026, 12:11",
        status: "Completed",
    },
    {
        id: "PAY-10473",
        reference: "AM-65099712",
        tenant: "Joyce Wambui",
        property: "Karen Gardens · A-03",
        channel: "Airtel Money",
        paymentDetail: "+254 735 118 602",
        amount: 45000,
        paidAt: "11 Jun 2026, 09:08",
        status: "Completed",
    },
    {
        id: "PAY-10472",
        reference: "NC-42890017",
        tenant: "Kevin Maina",
        property: "Parkview Apartments · 12D",
        channel: "Bank",
        paymentDetail: "NCBA Bank ·•• 3265",
        amount: 75000,
        paidAt: "10 May 2026, 14:32",
        status: "Pending",
    },
    {
        id: "PAY-10471",
        reference: "MP8V2K6RX3",
        tenant: "Lydia Naliaka",
        property: "Skyline Tower · 11A",
        channel: "M-PESA",
        paymentDetail: "+254 701 829 443",
        amount: 55000,
        paidAt: "09 May 2026, 08:45",
        status: "Completed",
    },
];
