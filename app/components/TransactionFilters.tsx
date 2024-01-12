import React from "react";
import { FilterType } from "../types";

type TransactionFiltersProps = {
  onFilterChange: (filterType: FilterType, value: string) => void;
};

const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  onFilterChange,
}) => {
  return (
    <div className="flex space-x-4 mb-4">
      <input
        type="text"
        placeholder="Search..."
        className="border p-2"
        onChange={(e) => onFilterChange("query", e.target.value)}
      />
      <select
        className="border p-2"
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
