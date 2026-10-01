import type { Customer, DashboardData } from "./definitions";

export const customers: Customer[] = [
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
    name: "Evil Rabbit",
    email: "evil@rabbit.com",
  },
  {
    id: "3958dc9e-712f-4377-85e9-fec7b6a6bb0a",
    name: "Delba de Oliveira",
    email: "delba@oliveira.com",
  },
  {
    id: "3958dc9e-742f-4377-85e9-fec7b6a6bb0a",
    name: "Lee Robinson",
    email: "lee@robinson.com",
  },
  {
    id: "76d65c26-f784-44a2-ac19-586678f7c2f2",
    name: "Michael Novotny",
    email: "michael@novotny.com",
  },
  {
    id: "cc27c14a-0acf-4f4a-a6c9-d45682c144b9",
    name: "Amy Burns",
    email: "amy@burns.com",
  },
  {
    id: "13d07535-c59e-4157-a011-f8d2ef4e0cbb",
    name: "Balazs Orban",
    email: "balazs@orban.com",
  },
];

export const dashboardData: DashboardData[] = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: "pending",
    date: "2022-12-06",
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: "pending",
    date: "2022-11-14",
  },
  {
    customer_id: customers[4].id,
    amount: 3040,
    status: "paid",
    date: "2022-10-29",
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: "paid",
    date: "2022-09-10",
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: "pending",
    date: "2022-08-05",
  },
  {
    customer_id: customers[2].id,
    amount: 54246,
    status: "pending",
    date: "2022-07-16",
  },
  {
    customer_id: customers[0].id,
    amount: 666,
    status: "pending",
    date: "2022-06-27",
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: "paid",
    date: "2022-06-09",
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: "paid",
    date: "2022-06-17",
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: "paid",
    date: "2022-06-07",
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: "paid",
    date: "2022-08-19",
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: "paid",
    date: "2022-06-18",
  },
];
