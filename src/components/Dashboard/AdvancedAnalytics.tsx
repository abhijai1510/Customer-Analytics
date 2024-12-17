import React from 'react';
import { Customer } from '../../types';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer
} from 'recharts';

interface AdvancedAnalyticsProps {
  customers: Customer[];
}

export const AdvancedAnalytics: React.FC<AdvancedAnalyticsProps> = ({ customers }) => {
  const scatterData = customers.map(customer => ({
    age: customer.age,
    spent: customer.spent,
    orders: customer.orders,
    name: `${customer.first_name} ${customer.last_name}`
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Age vs Spending Analysis</h2>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid />
          <XAxis type="number" dataKey="age" name="Age" unit=" years" />
          <YAxis type="number" dataKey="spent" name="Spent" unit="$" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="Customers" data={scatterData} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}; 