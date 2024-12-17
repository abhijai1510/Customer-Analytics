import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  PieChart, Pie, Cell, ResponsiveContainer 
} from 'recharts';
import { Customer } from '../../types';

interface VisualizationSectionProps {
  customers: Customer[];
}

export const VisualizationSection: React.FC<VisualizationSectionProps> = ({ customers }) => {
  // Age distribution data
  const ageGroups = customers.reduce((acc, customer) => {
    const ageGroup = Math.floor(customer.age / 10) * 10;
    const key = `${ageGroup}-${ageGroup + 9}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const ageData = Object.entries(ageGroups).map(([range, count]) => ({
    range,
    count
  }));

  // Spending by job data
  const spendingByJob = customers.reduce((acc, customer) => {
    acc[customer.job] = Number(((acc[customer.job] || 0) + customer.spent).toFixed(2));
    return acc;
  }, {} as Record<string, number>);

  const jobData = Object.entries(spendingByJob)
    .map(([job, total]) => ({
      job,
      total: Number(total.toFixed(2))
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Add job distribution chart
  const jobDistributionData = Object.entries(
    customers.reduce((acc, customer) => {
      acc[customer.job] = (acc[customer.job] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  )
  .map(([job, count]) => ({ job, count }))
  .sort((a, b) => b.count - a.count)
  .slice(0, 10);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Age Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Top 5 Jobs by Spending</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={jobData}
              dataKey="total"
              nameKey="job"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {jobData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Job Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={jobDistributionData}
              dataKey="count"
              nameKey="job"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {jobDistributionData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}; 