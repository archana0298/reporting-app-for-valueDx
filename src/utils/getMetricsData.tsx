import { MetricData } from "../data/mockData";

export interface AnalysisData {
  id: number;               
  date: string;            
  type: string;            
  name: string;            
  price: number;            
  status: 'Profit' | 'Expenses'; 
}

export const getMetricsData = (analysisData: AnalysisData[]): MetricData[] => {
  const netRevenue = analysisData
    .filter(item => item.status === 'Profit')
    .reduce((sum, item) => sum + item.price, 0);

  const netExpenses = analysisData
    .filter(item => item.status === 'Expenses')
    .reduce((sum, item) => sum + item.price, 0);

  const netProfit = netRevenue - netExpenses;

  const studentAdmissions = analysisData.filter(item => item.type === 'Admission').length;

  return [
    {
      title: 'Net Revenue',
      value: `₹${netRevenue.toLocaleString()}`,
      change: '0%', // you can calculate % change if you have past data
      trend: 'up',
      period: 'Total',
      color: 'bg-orange-50 border-orange-200'
    },
    {
      title: 'Net Profit',
      value: `₹${netProfit.toLocaleString()}`,
      change: '0%',
      trend: netProfit >= 0 ? 'up' : 'down',
      period: 'Total',
      color: 'bg-pink-50 border-pink-200'
    },
    {
      title: 'Net Expenses',
      value: `₹${netExpenses.toLocaleString()}`,
      change: '0%',
      trend: 'down',
      period: 'Total',
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'Student Admission',
      value: studentAdmissions.toString(),
      change: '0%',
      trend: 'up',
      period: 'Total',
      color: 'bg-blue-50 border-blue-200'
    }
  ];
};
