// import React from 'react';
// import { 
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
//   PieChart, Pie, Cell, ResponsiveContainer 
// } from 'recharts';
// import { Customer } from '../../types';

// interface VisualizationSectionProps {
//   customers: Customer[];
// }

// export const VisualizationSection: React.FC<VisualizationSectionProps> = ({ customers }) => {
//   // Age distribution data
//   const ageGroups = customers.reduce((acc, customer) => {
//     const ageGroup = Math.floor(customer.age / 10) * 10;
//     const key = `${ageGroup}-${ageGroup + 9}`;
//     acc[key] = (acc[key] || 0) + 1;
//     return acc;
//   }, {} as Record<string, number>);

//   const ageData = Object.entries(ageGroups).map(([range, count]) => ({
//     range,
//     count
//   }));

//   // Spending by job data
//   const spendingByJob = customers.reduce((acc, customer) => {
//     acc[customer.job] = Number(((acc[customer.job] || 0) + customer.spent).toFixed(2));
//     return acc;
//   }, {} as Record<string, number>);

//   const jobData = Object.entries(spendingByJob)
//     .map(([job, total]) => ({
//       job,
//       total: Number(total.toFixed(2))
//     }))
//     .sort((a, b) => b.total - a.total)
//     .slice(0, 5);

//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

//   // Add job distribution chart
//   const jobDistributionData = Object.entries(
//     customers.reduce((acc, customer) => {
//       acc[customer.job] = (acc[customer.job] || 0) + 1;
//       return acc;
//     }, {} as Record<string, number>)
//   )
//   .map(([job, count]) => ({ job, count }))
//   .sort((a, b) => b.count - a.count)
//   .slice(0, 10);

//   return (
//     <div className="space-y-6">
//       <div className="bg-white p-6 rounded-lg shadow-sm">
//         <h2 className="text-lg font-semibold mb-4">Age Distribution</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={ageData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="range" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="count" fill="#8884d8" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-sm">
//         <h2 className="text-lg font-semibold mb-4">Top 5 Jobs by Spending</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <PieChart>
//             <Pie
//               data={jobData}
//               dataKey="total"
//               nameKey="job"
//               cx="50%"
//               cy="50%"
//               outerRadius={100}
//               label
//             >
//               {jobData.map((_, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-sm">
//         <h2 className="text-lg font-semibold mb-4">Job Distribution</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <PieChart>
//             <Pie
//               data={jobDistributionData}
//               dataKey="count"
//               nameKey="job"
//               cx="50%"
//               cy="50%"
//               outerRadius={100}
//               label
//             >
//               {jobDistributionData.map((_, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }; 






//working new
//////////////////////////////////////////////////////////////////
// import React, { useState } from 'react';
// import { 
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
//   PieChart, Pie, Cell, ResponsiveContainer 
// } from 'recharts';
// import { Customer } from '../../types';

// interface VisualizationSectionProps {
//   customers: Customer[];
// }

// export const VisualizationSection: React.FC<VisualizationSectionProps> = ({ customers }) => {
//   const [activeTab, setActiveTab] = useState<'analytics' | 'predictions'>('analytics');

//   // Filters for predictions
//   const [filterGender, setFilterGender] = useState<string>('');
//   const [filterMarried, setFilterMarried] = useState<boolean | ''>('');
//   const [filterMinAge, setFilterMinAge] = useState<number | ''>('');

//   // Filter the customers based on the selected criteria for the predictions
//   const filteredCustomers = customers.filter(customer => {
//     let matches = true;
//     if (filterGender && customer.gender !== filterGender) {
//       matches = false;
//     }
//     if (filterMarried !== '' && customer.is_married !== filterMarried) {
//       matches = false;
//     }
//     if (filterMinAge !== '' && customer.age < filterMinAge) {
//       matches = false;
//     }
//     return matches;
//   });

//   /** ---------------------
//    * ANALYTICS DATA
//    * --------------------- */
//   // Age distribution data
//   const ageGroups = customers.reduce((acc, customer) => {
//     const ageGroup = Math.floor(customer.age / 10) * 10;
//     const key = `${ageGroup}-${ageGroup + 9}`;
//     acc[key] = (acc[key] || 0) + 1;
//     return acc;
//   }, {} as Record<string, number>);

//   const ageData = Object.entries(ageGroups).map(([range, count]) => ({
//     range,
//     count
//   }));

//   // Spending by job data
//   const spendingByJob = customers.reduce((acc, customer) => {
//     acc[customer.job] = Number(((acc[customer.job] || 0) + customer.spent).toFixed(2));
//     return acc;
//   }, {} as Record<string, number>);

//   const jobData = Object.entries(spendingByJob)
//     .map(([job, total]) => ({
//       job,
//       total: Number(total.toFixed(2))
//     }))
//     .sort((a, b) => b.total - a.total)
//     .slice(0, 5);

//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

//   // Job distribution data
//   const jobDistributionData = Object.entries(
//     customers.reduce((acc, customer) => {
//       acc[customer.job] = (acc[customer.job] || 0) + 1;
//       return acc;
//     }, {} as Record<string, number>)
//   )
//   .map(([job, count]) => ({ job, count }))
//   .sort((a, b) => b.count - a.count)
//   .slice(0, 10);

//   /** ---------------------
//    * PREDICTIONS DATA
//    * (Based on filteredCustomers)
//    * --------------------- */
//   const predictions = filteredCustomers.map((customer) => {
//     // Example heuristic predictions
//     const predictedCLV = Number((customer.spent * 2 + customer.age * 1.5).toFixed(2));
//     const predictedNextPurchaseTime = Math.max(1, Math.floor(30 - customer.orders * 0.5));
//     return {
//       ...customer,
//       predictedCLV,
//       predictedNextPurchaseTime
//     };
//   });

//   // Aggregate Predicted CLV Data
//   const clvRanges = predictions.reduce((acc, c) => {
//     // Grouping CLV predictions into ranges of 200 units
//     const rangeStart = Math.floor(c.predictedCLV / 200) * 200;
//     const rangeKey = `${rangeStart}-${rangeStart + 199}`;
//     acc[rangeKey] = (acc[rangeKey] || 0) + 1;
//     return acc;
//   }, {} as Record<string, number>);

//   const clvData = Object.entries(clvRanges).map(([range, count]) => ({
//     range,
//     count
//   })).sort((a,b) => {
//     const aStart = parseInt(a.range.split('-')[0], 10);
//     const bStart = parseInt(b.range.split('-')[0], 10);
//     return aStart - bStart;
//   });

//   // Aggregate Predicted Next Purchase Time Data
//   const nextPurchaseGroups = predictions.reduce((acc, c) => {
//     const days = c.predictedNextPurchaseTime;
//     acc[days] = (acc[days] || 0) + 1;
//     return acc;
//   }, {} as Record<number, number>);

//   const nextPurchaseData = Object.entries(nextPurchaseGroups).map(([days, count]) => ({
//     days: Number(days),
//     count
//   })).sort((a, b) => a.days - b.days);

//   // Handle filter form submission
//   const handleFilterSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Simply prevents page refresh, filtering is handled reactively by state above
//   };

//   return (
//     <div className="space-y-6">
//       {/* Tabs for navigation */}
//       <div className="flex space-x-4 pb-4 border-b border-gray-200">
//         <button 
//           className={`px-4 py-2 rounded-t ${activeTab === 'analytics' ? 'bg-white text-black border-x border-t' : 'bg-gray-100 text-gray-600'}`}
//           onClick={() => setActiveTab('analytics')}
//         >
//           Analytics
//         </button>
//         <button 
//           className={`px-4 py-2 rounded-t ${activeTab === 'predictions' ? 'bg-white text-black border-x border-t' : 'bg-gray-100 text-gray-600'}`}
//           onClick={() => setActiveTab('predictions')}
//         >
//           Predictions
//         </button>
//       </div>

//       {/* Show Analytics Section */}
//       {activeTab === 'analytics' && (
//         <div className="space-y-6">
//           {/* Age Distribution Section */}
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <h2 className="text-lg font-semibold mb-4">Age Distribution</h2>
//             <p className="text-sm text-gray-600 mb-4">
//               This chart shows how customers are distributed across different age ranges.
//             </p>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={ageData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="range" label={{ value: 'Age Range', position: 'insideBottom', offset: -5 }} />
//                 <YAxis label={{ value: 'Number of Customers', angle: -90, position: 'insideLeft' }} />
//                 <Tooltip />
//                 <Bar dataKey="count" fill="#8884d8" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Top 5 Jobs by Spending Section */}
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <h2 className="text-lg font-semibold mb-4">Top 5 Jobs by Spending</h2>
//             <p className="text-sm text-gray-600 mb-4">
//               This pie chart shows which occupations have customers who spend the most, aggregated across all customers.
//             </p>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={jobData}
//                   dataKey="total"
//                   nameKey="job"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={100}
//                   label
//                 >
//                   {jobData.map((_, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Job Distribution Section */}
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <h2 className="text-lg font-semibold mb-4">Job Distribution</h2>
//             <p className="text-sm text-gray-600 mb-4">
//               This pie chart shows the most common jobs among our customers, giving insight into the demographic composition.
//             </p>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={jobDistributionData}
//                   dataKey="count"
//                   nameKey="job"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={100}
//                   label
//                 >
//                   {jobDistributionData.map((_, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       )}

//       {/* Show Predictions Section */}
//       {activeTab === 'predictions' && (
//         <div className="space-y-6">
//           <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
//             <h2 className="text-lg font-semibold">Predictions</h2>
//             <p className="text-sm text-gray-600">
//               Below are example visualizations for two predictive metrics we might derive:
//             </p>
//             <ul className="list-disc list-inside text-sm text-gray-600 mb-4">
//               <li><strong>Predicted Customer Lifetime Value (CLV):</strong> An estimate of the total worth of a customer over their entire relationship with the company.</li>
//               <li><strong>Predicted Next Purchase Time:</strong> An estimate of how many days until the customer’s next purchase, based on their past behavior.</li>
//             </ul>

//             {/* Filtering Form */}
//             <form onSubmit={handleFilterSubmit} className="border-b border-gray-200 pb-4 mb-4 space-y-4">
//               <h3 className="text-md font-semibold">Filter Customers for Predictions</h3>
//               <div className="flex space-x-4">
//                 {/* Gender Filter */}
//                 <div>
//                   <label className="text-sm text-gray-700 block mb-1">Gender</label>
//                   <select
//                     className="border border-gray-300 rounded p-1 text-sm"
//                     value={filterGender}
//                     onChange={(e) => setFilterGender(e.target.value)}
//                   >
//                     <option value="">All</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                   </select>
//                 </div>

//                 {/* Married Filter */}
//                 <div>
//                   <label className="text-sm text-gray-700 block mb-1">Married</label>
//                   <select
//                     className="border border-gray-300 rounded p-1 text-sm"
//                     value={filterMarried === '' ? '' : filterMarried ? 'true' : 'false'}
//                     onChange={(e) => {
//                       const val = e.target.value;
//                       if (val === '') setFilterMarried('');
//                       else setFilterMarried(val === 'true');
//                     }}
//                   >
//                     <option value="">All</option>
//                     <option value="true">Married</option>
//                     <option value="false">Not Married</option>
//                   </select>
//                 </div>

//                 {/* Min Age Filter */}
//                 <div>
//                   <label className="text-sm text-gray-700 block mb-1">Minimum Age</label>
//                   <input
//                     type="number"
//                     className="border border-gray-300 rounded p-1 text-sm"
//                     value={filterMinAge === '' ? '' : filterMinAge}
//                     onChange={(e) => {
//                       const val = e.target.value;
//                       setFilterMinAge(val === '' ? '' : Number(val));
//                     }}
//                     placeholder="No minimum"
//                   />
//                 </div>
//               </div>

//               <button 
//                 type="submit" 
//                 className="mt-2 bg-blue-500 text-white px-4 py-1 rounded text-sm hover:bg-blue-600"
//               >
//                 Apply Filters
//               </button>
//             </form>

//             {predictions.length === 0 ? (
//               <p className="text-sm text-gray-500">
//                 No customers match the current filters. Please adjust your criteria.
//               </p>
//             ) : (
//               <>
//                 {/* Predicted CLV Distribution */}
//                 <div className="mb-8">
//                   <h3 className="text-md font-semibold mb-2">Predicted CLV Distribution</h3>
//                   <p className="text-sm text-gray-600 mb-4">
//                     This bar chart groups filtered customers by their predicted CLV ranges (e.g., 0-199, 200-399, etc.). 
//                     Higher ranges indicate customers who are expected to be more valuable over the long term.
//                   </p>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <BarChart data={clvData}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="range" label={{ value: 'Predicted CLV Range', position: 'insideBottom', offset: -5 }} />
//                       <YAxis label={{ value: 'Number of Customers', angle: -90, position: 'insideLeft' }} />
//                       <Tooltip />
//                       <Bar dataKey="count" fill="#82ca9d" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>

//                 {/* Predicted Next Purchase Time */}
//                 <div>
//                   <h3 className="text-md font-semibold mb-2">Predicted Next Purchase Time (Days)</h3>
//                   <p className="text-sm text-gray-600 mb-4">
//                     This bar chart shows how many filtered customers are predicted to buy again in a given number of days. 
//                     Bars toward the left (lower days) indicate more immediate repeat purchases.
//                   </p>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <BarChart data={nextPurchaseData}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="days" label={{ value: 'Days Until Next Purchase', position: 'insideBottom', offset: -5 }} />
//                       <YAxis label={{ value: 'Number of Customers', angle: -90, position: 'insideLeft' }} />
//                       <Tooltip />
//                       <Bar dataKey="count" fill="#8884d8" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
//////////////////////////////////////////////////////////////////////



import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  PieChart, Pie, Cell, ResponsiveContainer 
} from 'recharts';
import { Customer } from '../../types';

interface VisualizationSectionProps {
  customers: Customer[];
}

export const VisualizationSection: React.FC<VisualizationSectionProps> = ({ customers }) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'predictions'>('analytics');

  // Filters for predictions and hobby recommendations
  const [filterGender, setFilterGender] = useState<string>('');
  const [filterMarried, setFilterMarried] = useState<boolean | ''>('');
  const [filterMinAge, setFilterMinAge] = useState<number | ''>('');

  // Apply filters to determine the "similar" group for predictions and hobby recommendations
  const filteredCustomers = customers.filter(customer => {
    let matches = true;
    if (filterGender && customer.gender !== filterGender) {
      matches = false;
    }
    if (filterMarried !== '' && customer.is_married !== filterMarried) {
      matches = false;
    }
    if (filterMinAge !== '' && customer.age < filterMinAge) {
      matches = false;
    }
    return matches;
  });

  /** ---------------------
   * ANALYTICS DATA
   * --------------------- */
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

  // Job distribution data
  const jobDistributionData = Object.entries(
    customers.reduce((acc, customer) => {
      acc[customer.job] = (acc[customer.job] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  )
  .map(([job, count]) => ({ job, count }))
  .sort((a, b) => b.count - a.count)
  .slice(0, 10);

  /** ---------------------
   * PREDICTIONS DATA
   * --------------------- */
  const predictions = filteredCustomers.map((customer) => {
    // Example heuristic predictions
    const predictedCLV = Number((customer.spent * 2 + customer.age * 1.5).toFixed(2));
    const predictedNextPurchaseTime = Math.max(1, Math.floor(30 - customer.orders * 0.5));
    return {
      ...customer,
      predictedCLV,
      predictedNextPurchaseTime
    };
  });

  // Aggregate Predicted CLV Data
  const clvRanges = predictions.reduce((acc, c) => {
    // Grouping CLV predictions into ranges of 200 units
    const rangeStart = Math.floor(c.predictedCLV / 200) * 200;
    const rangeKey = `${rangeStart}-${rangeStart + 199}`;
    acc[rangeKey] = (acc[rangeKey] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const clvData = Object.entries(clvRanges).map(([range, count]) => ({
    range,
    count
  })).sort((a,b) => {
    const aStart = parseInt(a.range.split('-')[0], 10);
    const bStart = parseInt(b.range.split('-')[0], 10);
    return aStart - bStart;
  });

  // Aggregate Predicted Next Purchase Time Data
  const nextPurchaseGroups = predictions.reduce((acc, c) => {
    const days = c.predictedNextPurchaseTime;
    acc[days] = (acc[days] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const nextPurchaseData = Object.entries(nextPurchaseGroups).map(([days, count]) => ({
    days: Number(days),
    count
  })).sort((a, b) => a.days - b.days);

  /** ---------------------
   * HOBBY RECOMMENDATIONS
   * --------------------- */
  // Based on the filtered customers, find the most common hobbies.
  // This suggests that these hobbies are popular among similar customers, and thus could be recommended.
  const hobbyCounts = filteredCustomers.reduce((acc, customer) => {
    if (customer.hobbies) {
      // Assuming customer.hobbies is a string, or an array. If it's a single string field, we use that directly.
      // If multiple hobbies are possible, adjust accordingly.
      const hobby = customer.hobbies; 
      acc[hobby] = (acc[hobby] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const hobbyData = Object.entries(hobbyCounts).map(([hobby, count]) => ({
    hobby,
    count
  }))
  .sort((a, b) => b.count - a.count)
  .slice(0, 10); // top 10 recommended hobbies

  // Handle filter form submission
  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Filtering is handled reactively by state changes
  };

  return (
    <div className="space-y-6">
      {/* Tabs for navigation */}
      <div className="flex space-x-4 pb-4 border-b border-gray-200">
        <button 
          className={`px-4 py-2 rounded-t ${activeTab === 'analytics' ? 'bg-white text-black border-x border-t' : 'bg-gray-100 text-gray-600'}`}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
        <button 
          className={`px-4 py-2 rounded-t ${activeTab === 'predictions' ? 'bg-white text-black border-x border-t' : 'bg-gray-100 text-gray-600'}`}
          onClick={() => setActiveTab('predictions')}
        >
          Predictions
        </button>
      </div>

      {/* Show Analytics Section */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Age Distribution Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Age Distribution</h2>
            <p className="text-sm text-gray-600 mb-4">
              This chart shows how customers are distributed across different age ranges.
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" label={{ value: 'Age Range', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Number of Customers', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top 5 Jobs by Spending Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Top 5 Jobs by Spending</h2>
            <p className="text-sm text-gray-600 mb-4">
              This pie chart shows which occupations have customers who spend the most, aggregated across all customers.
            </p>
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

          {/* Job Distribution Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Job Distribution</h2>
            <p className="text-sm text-gray-600 mb-4">
              This pie chart shows the most common jobs among our customers, giving insight into the demographic composition.
            </p>
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
      )}

      {/* Show Predictions Section */}
      {activeTab === 'predictions' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <h2 className="text-lg font-semibold">Predictions</h2>
            <p className="text-sm text-gray-600">
              Below are example visualizations for predictive metrics we might derive:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 mb-4">
              <li><strong>Predicted Customer Lifetime Value (CLV):</strong> An estimate of the total worth of a customer over their entire relationship with the company.</li>
              <li><strong>Predicted Next Purchase Time:</strong> An estimate of how many days until the customer’s next purchase, based on their past behavior.</li>
              <li><strong>Hobby Recommendations:</strong> Suggested hobbies based on common interests among similar customers.</li>
            </ul>

            {/* Filtering Form */}
            <form onSubmit={handleFilterSubmit} className="border-b border-gray-200 pb-4 mb-4 space-y-4">
              <h3 className="text-md font-semibold">Filter Customers for Predictions</h3>
              <div className="flex space-x-4">
                {/* Gender Filter */}
                <div>
                  <label className="text-sm text-gray-700 block mb-1">Gender</label>
                  <select
                    className="border border-gray-300 rounded p-1 text-sm"
                    value={filterGender}
                    onChange={(e) => setFilterGender(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                {/* Married Filter */}
                <div>
                  <label className="text-sm text-gray-700 block mb-1">Married</label>
                  <select
                    className="border border-gray-300 rounded p-1 text-sm"
                    value={filterMarried === '' ? '' : filterMarried ? 'true' : 'false'}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '') setFilterMarried('');
                      else setFilterMarried(val === 'true');
                    }}
                  >
                    <option value="">All</option>
                    <option value="true">Married</option>
                    <option value="false">Not Married</option>
                  </select>
                </div>

                {/* Min Age Filter */}
                <div>
                  <label className="text-sm text-gray-700 block mb-1">Minimum Age</label>
                  <input
                    type="number"
                    className="border border-gray-300 rounded p-1 text-sm"
                    value={filterMinAge === '' ? '' : filterMinAge}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFilterMinAge(val === '' ? '' : Number(val));
                    }}
                    placeholder="No minimum"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="mt-2 bg-blue-500 text-white px-4 py-1 rounded text-sm hover:bg-blue-600"
              >
                Apply Filters
              </button>
            </form>

            {predictions.length === 0 ? (
              <p className="text-sm text-gray-500">
                No customers match the current filters. Please adjust your criteria.
              </p>
            ) : (
              <>
                {/* Predicted CLV Distribution */}
                <div className="mb-8">
                  <h3 className="text-md font-semibold mb-2">Predicted CLV Distribution</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    This bar chart groups filtered customers by their predicted CLV ranges. Higher ranges indicate customers who are expected to be more valuable over the long term.
                  </p>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={clvData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" label={{ value: 'Predicted CLV Range', position: 'insideBottom', offset: -5 }} />
                      <YAxis label={{ value: 'Number of Customers', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Predicted Next Purchase Time */}
                <div className="mb-8">
                  <h3 className="text-md font-semibold mb-2">Predicted Next Purchase Time (Days)</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    This bar chart shows how many filtered customers are predicted to buy again in a given number of days. 
                    Bars toward the left (lower days) indicate more immediate repeat purchases.
                  </p>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={nextPurchaseData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="days" label={{ value: 'Days Until Next Purchase', position: 'insideBottom', offset: -5 }} />
                      <YAxis label={{ value: 'Number of Customers', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Hobby Recommendations */}
                <div>
                  <h3 className="text-md font-semibold mb-2">Hobby Recommendations</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Below are the most common hobbies found among the filtered (similar) customers. 
                    Consider these as recommended hobbies for someone matching the selected criteria.
                  </p>
                  {hobbyData.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No hobby data available for the selected filters.
                    </p>
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={hobbyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hobby" label={{ value: 'Hobbies', position: 'insideBottom', offset: -5 }} />
                        <YAxis label={{ value: 'Number of Customers', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#ffa07a" />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
