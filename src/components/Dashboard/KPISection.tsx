import type { FC } from 'react';
import { DashboardMetrics } from '../../types';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
}

const KPICard: FC<KPICardProps> = ({ title, value, change }) => (
  <div className="bg-white rounded-lg p-6 shadow-sm">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <div className="mt-2 flex items-baseline">
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
      {change !== undefined && (
        <span className={`ml-2 text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
        </span>
      )}
    </div>
  </div>
);

interface KPISectionProps {
  metrics: DashboardMetrics;
}

export const KPISection: React.FC<KPISectionProps> = ({ metrics }) => {
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard 
        title="Total Customers" 
        value={metrics.totalCustomers.toLocaleString()}
      />
      <KPICard 
        title="Average Order Value" 
        value={formatCurrency(metrics.averageOrderValue)}
      />
      <KPICard 
        title="Total Revenue" 
        value={formatCurrency(metrics.totalRevenue)}
      />
      <KPICard 
        title="Customer Satisfaction" 
        value={`${(metrics.averageSatisfaction * 100).toFixed(1)}%`}
      />
    </div>
  );
}; 
