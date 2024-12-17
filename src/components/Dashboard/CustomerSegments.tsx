import React from 'react';
import { CustomerSegment } from '../../types';

interface CustomerSegmentsProps {
  segments: CustomerSegment[];
}

export const CustomerSegments: React.FC<CustomerSegmentsProps> = ({ segments }) => {
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Customer Segments</h2>
      <div className="space-y-4">
        {segments.map(segment => (
          <div key={segment.id} className="border rounded-lg p-4">
            <h3 className="text-md font-semibold text-gray-900">{segment.name}</h3>
            <div className="mt-2 space-y-2">
              <p className="text-sm text-gray-600">
                Customers: {segment.customerCount}
              </p>
              <p className="text-sm text-gray-600">
                Average Spending: {formatCurrency(segment.averageSpending)}
              </p>
              <div className="mt-3">
                <h4 className="text-sm font-medium text-gray-700">Characteristics:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                  {segment.characteristics.map((char, index) => (
                    <li key={index}>{char}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 