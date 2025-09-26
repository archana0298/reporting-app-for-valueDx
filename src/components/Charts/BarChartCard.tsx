import React, { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { analysisData } from "../../data/mockData";

const BarChartCard: React.FC = () => {
  // Aggregate data for bar chart (total price per type by status)
  const barData = useMemo(() => {
    const map: Record<string, { type: string; Profit: number; Expenses: number }> = {};

    analysisData.forEach((item) => {
      if (!map[item.type]) map[item.type] = { type: item.type, Profit: 0, Expenses: 0 };
      map[item.type][item.status] += item.price;
    });

    return Object.values(map);
  }, []);

  return (
    <div className="bg-white shadow rounded p-1 mb-1">
      <h3 className="font-semibold mb-4 text-lg">Profit vs Expenses by Type</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={barData}>
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Profit" fill="#00A896" />
          <Bar dataKey="Expenses" fill="#4F6D7A" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartCard;
