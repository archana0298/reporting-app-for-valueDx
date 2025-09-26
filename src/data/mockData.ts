export interface MetricData {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  period: string;
  color: string;
}

export interface ExpenseData {
  id: number;
  slNo: number;
  date: string;
  type: string;
  price: number;
  totalPrice: number;
}

export interface AnalysisData {
  id: number;
  date: string;
  type: string;
  name: string;
  price: number;
  status: 'Profit' | 'Expenses';
}

export interface ChartData {
  month: string;
  expenses: number;
  profit: number;
}

export const metricsData: MetricData[] = [
  {
    title: 'Net Revenue',
    value: '₹2,40,000',
    change: '2.4%',
    trend: 'up',
    period: 'Last Week',
    color: 'bg-orange-50 border-orange-200'
  },
  {
    title: 'Net Profit',
    value: '₹1,80,000',
    change: '2.4%',
    trend: 'down',
    period: 'Last Month',
    color: 'bg-pink-50 border-pink-200'
  },
  {
    title: 'Net Expenses',
    value: '₹60,000',
    change: '2.4%',
    trend: 'down',
    period: 'Last Month',
    color: 'bg-green-50 border-green-200'
  },
  {
    title: 'Student Admission',
    value: '240',
    change: '2.4%',
    trend: 'up',
    period: 'Last Month',
    color: 'bg-blue-50 border-blue-200'
  }
];

export const chartData: ChartData[] = [
  { month: 'Jan', expenses: 25000, profit: 30000 },
  { month: 'Jan', expenses: 18000, profit: 25000 },
  { month: 'Jan', expenses: 26000, profit: 28000 },
  { month: 'Jan', expenses: 30000, profit: 35000 },
  { month: 'Jan', expenses: 22000, profit: 20000 },
  { month: 'Jan', expenses: 24000, profit: 22000 }
];

export const expenseData: ExpenseData[] = [
  {
    id: 1,
    slNo: 1,
    date: '12/09/24',
    type: 'Electric Bill',
    price: 1200.00,
    totalPrice: 1200.00
  },
  {
    id: 2,
    slNo: 2,
    date: '12/09/24',
    type: 'Water Bill',
    price: 1200.00,
    totalPrice: 1300.00
  },
  {
    id: 3,
    slNo: 3,
    date: '12/09/24',
    type: 'Paper',
    price: 1200.00,
    totalPrice: 3200.00
  },
  {
    id: 4,
    slNo: 4,
    date: '12/09/24',
    type: 'Salary',
    price: 1200.00,
    totalPrice: 4200.00
  },
  {
    id: 5,
    slNo: 5,
    date: '12/09/24',
    type: 'Construction',
    price: 1200.00,
    totalPrice: 5200.00
  },
  {
    id: 6,
    slNo: 6,
    date: '12/09/24',
    type: 'Admission',
    price: 1200.00,
    totalPrice: 7200.00
  }
];

export const analysisData: AnalysisData[] = [
  { id: 1, date: '01/01/2020', type: 'Admission', name: 'Alice Johnson', price: 1500, status: 'Profit' },
  { id: 2, date: '03/01/2021', type: 'Electric Bill', name: 'Green Energy Co.', price: 5000, status: 'Expenses' },
  { id: 3, date: '05/01/2025', type: 'Admission', name: 'Bob Smith', price: 2000, status: 'Profit' },
  { id: 4, date: '07/01/2024', type: 'Water Bill', name: 'Aqua Supplies Ltd.', price: 3200, status: 'Expenses' },
  { id: 5, date: '09/01/2022', type: 'Paper Supplies', name: 'Office Essentials', price: 1200, status: 'Expenses' },
  { id: 6, date: '10/01/2023', type: 'Salary', name: 'John Doe', price: 10000, status: 'Expenses' },
  { id: 7, date: '12/01/2025', type: 'Admission', name: 'Carol White', price: 2500, status: 'Profit' },
  { id: 8, date: '14/01/2020', type: 'Maintenance', name: 'BuildIt Services', price: 4500, status: 'Expenses' },
  { id: 9, date: '15/01/2025', type: 'Electric Bill', name: 'Volt Industries', price: 4800, status: 'Expenses' },
  { id: 10, date: '16/01/2025', type: 'Admission', name: 'David Lee', price: 1800, status: 'Profit' },
  { id: 11, date: '18/01/2025', type: 'Water Bill', name: 'Pure Water Co.', price: 3500, status: 'Expenses' },
  { id: 12, date: '19/01/2025', type: 'Admission', name: 'Emma Brown', price: 2200, status: 'Profit' },
  { id: 13, date: '20/01/2025', type: 'Salary', name: 'Michael Green', price: 12000, status: 'Expenses' },
  { id: 14, date: '21/01/2025', type: 'Paper Supplies', name: 'Stationery Hub', price: 1500, status: 'Expenses' },
  { id: 15, date: '22/01/2025', type: 'Admission', name: 'Sophia Davis', price: 2600, status: 'Profit' },
  { id: 16, date: '23/01/2025', type: 'Maintenance', name: 'FixIt Solutions', price: 5000, status: 'Expenses' },
  { id: 17, date: '24/01/2025', type: 'Electric Bill', name: 'PowerGrid Ltd.', price: 4700, status: 'Expenses' },
  { id: 18, date: '25/01/2025', type: 'Admission', name: 'James Wilson', price: 2400, status: 'Profit' },
  { id: 19, date: '26/01/2025', type: 'Water Bill', name: 'Clear Water Co.', price: 3600, status: 'Expenses' },
  { id: 20, date: '27/01/2025', type: 'Admission', name: 'Olivia Martinez', price: 2800, status: 'Profit' },
];


export const generateMetrics = (analysis: AnalysisData[]): MetricData[] => {
  const totalRevenue = analysis
    .filter(a => a.status === 'Profit')
    .reduce((sum, a) => sum + a.price, 0);

  const totalExpenses = analysis
    .filter(a => a.status === 'Expenses')
    .reduce((sum, a) => sum + a.price, 0);

  const netProfit = totalRevenue - totalExpenses;

  const studentAdmissions = analysis.filter(a => a.type === 'Admission').length;

  return [
    {
      title: 'Net Revenue',
      value: `₹${totalRevenue.toLocaleString()}`,
      change: '2.4%',
      trend: totalRevenue >= 0 ? 'up' : 'down',
      period: 'This Month',
      color: 'bg-orange-50 border-orange-200',
    },
    {
      title: 'Net Profit',
      value: `₹${netProfit.toLocaleString()}`,
      change: '2.4%',
      trend: netProfit >= 0 ? 'up' : 'down',
      period: 'This Month',
      color: 'bg-pink-50 border-pink-200',
    },
    {
      title: 'Net Expenses',
      value: `₹${totalExpenses.toLocaleString()}`,
      change: '2.4%',
      trend: 'down',
      period: 'This Month',
      color: 'bg-green-50 border-green-200',
    },
    {
      title: 'Student Admission',
      value: studentAdmissions.toString(),
      change: '2.4%',
      trend: studentAdmissions > 0 ? 'up' : 'down',
      period: 'This Month',
      color: 'bg-blue-50 border-blue-200',
    },
  ];
};
