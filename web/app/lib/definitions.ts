export type InvoiceStatus = "pending" | "paid";

export type Customer = {
  id: string;
  name: string;
  email: string;
};

export type DashboardData = {
  customer_id: string;
  amount: number;
  status: InvoiceStatus;
  date: string;
};
