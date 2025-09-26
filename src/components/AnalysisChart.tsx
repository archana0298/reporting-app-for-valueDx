import React from 'react';
import { Card } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartData } from '../data/mockData';

interface AnalysisChartProps {
  data: ChartData[];
}

const AnalysisChart: React.FC<AnalysisChartProps> = ({ data }) => {
  return (
    <Card 
      title="Analysis" 
      className="mb-6 shadow-sm hover:shadow-md transition-shadow duration-300"
     
    >
      <div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#666', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#666', fontSize: 12 }}
              tickFormatter={(value) => `${value/1000}k`}
            />
            <Tooltip 
              formatter={(value: any) => [`₹${value.toLocaleString()}`, '']}
              labelStyle={{ color: '#666' }}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="rect"
            />
            <Bar 
              dataKey="expenses" 
              fill="#6366f1" 
              name="Expenses"
              radius={[4, 4, 0, 0]}
              animationDuration={1000}
              animationBegin={0}
            />
            <Bar 
              dataKey="profit" 
              fill="#3b82f6" 
              name="Profit"
              radius={[4, 4, 0, 0]}
              animationDuration={1000}
              animationBegin={200}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default AnalysisChart;