import React from "react";
import { FilterType } from "../types";

type TransactionFiltersProps = {
  onFilterChange: (filterType: FilterType, value: string) => void;
};

const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  onFilterChange,
}) => {
  return (
    <div className="flex justify-between mb-4 bg-white p-4 shadow rounded-lg">
      <input
        type="text"
        placeholder="Search..."
        className="border p-2 rounded w-full mr-4"
        onChange={(e) => onFilterChange("query", e.target.value)}
      />
      <select
        className="border p-2 rounded"
        onChange={(e) => onFilterChange("type", e.target.value)}
      >
        <option value="">All Types</option>
        <option value="Deposit">Deposit</option>
        <option value="Withdrawal">Withdrawal</option>
      </select>
    </div>
  );
};

export default TransactionFilters;
