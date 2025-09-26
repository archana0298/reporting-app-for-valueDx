import React, { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { analysisData } from "../../data/mockData";

const COLORS = ["#00A896", "#4F6D7A"];

const PieChartCard: React.FC = () => {
  // Aggregate data for pie chart (total Profit vs Expenses)
  const pieData = useMemo(() => {
    let totalProfit = 0;
    let totalExpenses = 0;

    analysisData.forEach(item => {
      if (item.status === "Profit") totalProfit += item.price;
      else totalExpenses += item.price;
    });

    return [
      { name: "Profit", value: totalProfit },
      { name: "Expenses", value: totalExpenses },
    ];
  }, []);

  return (
  <div className="bg-white shadow rounded p-1 mb-1">
      <h3 className="font-semibold mb-4 text-lg">Profit vs Expenses</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {pieData.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartCard;
