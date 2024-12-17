import * as tf from '@tensorflow/tfjs';
import { Customer, CustomerSegment } from '../types';

export class AIService {
  private model: tf.LayersModel | null = null;

  async initialize() {
    try {
      this.model = await tf.loadLayersModel('path/to/model.json');
    } catch (error) {
      console.error('Error loading model:', error);
      this.model = this.createModel();
    }
  }

  private createModel(): tf.LayersModel {
    const model = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [5], units: 32, activation: 'relu' }),
        tf.layers.dense({ units: 16, activation: 'relu' }),
        tf.layers.dense({ units: 4, activation: 'softmax' })
      ]
    });

    model.compile({
      optimizer: tf.train.adam(),
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    });

    return model;
  }

  private normalizeFeatures(customers: Customer[]): number[][] {
    const maxSpent = Math.max(...customers.map(c => c.spent));
    const maxOrders = Math.max(...customers.map(c => c.orders));
    
    return customers.map(customer => [
      customer.age / 100, // Normalize age to 0-1
      customer.spent / maxSpent, // Normalize spending
      customer.orders / maxOrders, // Normalize orders
      this.getDaysSinceRegistration(customer.registered) / 365, // Normalize registration time
      customer.is_married ? 1 : 0 // Binary feature
    ]);
  }

  private getDaysSinceRegistration(registrationDate: string): number {
    const registration = new Date(registrationDate);
    const today = new Date();
    return Math.floor((today.getTime() - registration.getTime()) / (1000 * 60 * 60 * 24));
  }

  async segmentCustomers(customers: Customer[]): Promise<CustomerSegment[]> {
    if (!this.model) {
      throw new Error('Model not initialized');
    }

    const features = this.normalizeFeatures(customers);
    const tensorData = tf.tensor2d(features);
    const predictions = await (this.model.predict(tensorData) as tf.Tensor).array();
    
    return this.createSegments(customers, predictions as number[][]);
  }

  private createSegments(customers: Customer[], predictions: number[][]): CustomerSegment[] {
    const segmentGroups = new Map<number, Customer[]>();
    
    predictions.forEach((pred, index) => {
      const segmentIndex = pred.indexOf(Math.max(...pred));
      const currentGroup = segmentGroups.get(segmentIndex) || [];
      currentGroup.push(customers[index]);
      segmentGroups.set(segmentIndex, currentGroup);
    });

    return Array.from(segmentGroups.entries()).map(([index, groupCustomers]) => ({
      id: `segment-${index}`,
      name: this.getSegmentName(groupCustomers),
      characteristics: this.analyzeSegmentCharacteristics(groupCustomers),
      customerCount: groupCustomers.length,
      averageSpending: groupCustomers.reduce((sum, c) => sum + c.spent, 0) / groupCustomers.length
    }));
  }

  private getSegmentName(customers: Customer[]): string {
    const avgSpent = customers.reduce((sum, c) => sum + c.spent, 0) / customers.length;
    const avgAge = customers.reduce((sum, c) => sum + c.age, 0) / customers.length;
    
    if (avgSpent > 500) return 'High-Value Customers';
    if (avgAge > 50) return 'Senior Customers';
    if (this.getDaysSinceRegistration(customers[0].registered) < 180) return 'New Customers';
    return 'Regular Customers';
  }

  private analyzeSegmentCharacteristics(customers: Customer[]): string[] {
    const characteristics: string[] = [];
    
    // Common jobs
    const commonJobs = this.findCommonValues(customers.map(c => c.job));
    characteristics.push(`Common jobs: ${commonJobs.join(', ')}`);
    
    // Common hobbies
    const commonHobbies = this.findCommonValues(customers.flatMap(c => c.hobbies.split(',')));
    characteristics.push(`Popular hobbies: ${commonHobbies.join(', ')}`);
    
    // Age range
    const ages = customers.map(c => c.age);
    characteristics.push(`Age range: ${Math.min(...ages)}-${Math.max(...ages)}`);
    
    return characteristics;
  }

  private findCommonValues(values: string[]): string[] {
    const frequency = values.reduce((acc, val) => {
      acc[val.trim()] = (acc[val.trim()] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(frequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([val]) => val);
  }
} 