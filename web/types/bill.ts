export interface Bill {
    _id: string;
    amount: number;
    paidDate: string | null;
    usn: string;
    billDate: string;
    dueDate: string;
    name: string;
    room: string;
    serviceNo: string;
    roomNumber: number;
    tenantName?: string;
}

