export interface Customer {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  gender: 'male' | 'female';
  age: number;
  registered: string;
  orders: number;
  spent: number;
  job: string;
  hobbies: string;
  is_married: boolean;
}

export interface CustomerSegment {
  id: string;
  name: string;
  characteristics: string[];
  customerCount: number;
  averageSpending: number;
}

export interface DashboardMetrics {
  totalCustomers: number;
  averageOrderValue: number;
  totalRevenue: number;
  averageSatisfaction: number;
  genderRatio?: number;
} 