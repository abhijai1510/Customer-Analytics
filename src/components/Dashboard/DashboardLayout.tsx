import React, { useState, useEffect } from 'react';
import { KPISection } from './KPISection';
import { VisualizationSection } from './VisualizationSection';
import { CustomerSegments } from './CustomerSegments';
import { AdvancedAnalytics } from './AdvancedAnalytics';
import { CSVImporter } from '../DataImport/CSVImporter';
import { AIService } from '../../services/AIService';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';
import { Customer, CustomerSegment, DashboardMetrics } from '../../types';

export const DashboardLayout: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [segments, setSegments] = useState<CustomerSegment[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalCustomers: 0,
    averageOrderValue: 0,
    totalRevenue: 0,
    averageSatisfaction: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const aiService = new AIService();

  useEffect(() => {
    if (customers.length > 0) {
      calculateMetrics();
      performSegmentation();
    }
  }, [customers]);

  const calculateMetrics = () => {
    try {
      const totalRevenue = customers.reduce((sum, c) => sum + c.spent, 0);
      const totalOrders = customers.reduce((sum, c) => sum + c.orders, 0);
      const genderDistribution = customers.reduce((acc, c) => {
        acc[c.gender] = (acc[c.gender] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      setMetrics({
        totalCustomers: customers.length,
        averageOrderValue: totalOrders ? (totalRevenue / totalOrders) : 0,
        totalRevenue,
        averageSatisfaction: 0.85,
        genderRatio: genderDistribution.male / genderDistribution.female
      });
    } catch (error) {
      setError('Error calculating metrics');
      console.error(error);
    }
  };

  const performSegmentation = async () => {
    setLoading(true);
    setError(null);
    try {
      await aiService.initialize();
      const newSegments = await aiService.segmentCustomers(customers);
      setSegments(newSegments);
    } catch (error) {
      setError('Error performing customer segmentation');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDataImport = (data: Customer[]) => {
    setError(null);
    setCustomers(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Customer Analytics | Abhijai Srivastava Solo Hackathon Project 3
        </h1>
      </header>
      
      <div className="mb-8">
        <CSVImporter onDataImport={handleDataImport} />
      </div>

      {error && <ErrorMessage message={error} />}

      {loading && <LoadingSpinner />}

      {customers.length > 0 && !loading && (
        <main className="space-y-6">
          <KPISection metrics={metrics} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <VisualizationSection customers={customers} />
            <CustomerSegments segments={segments} />
          </div>
          <AdvancedAnalytics customers={customers} />
        </main>
      )}
    </div>
  );
}; 