export type Transaction = {
  id: number;
  date: string;
  amount: string;
  type: string;
  details: string;
};

export type FilterType = "date" | "query" | "type";
