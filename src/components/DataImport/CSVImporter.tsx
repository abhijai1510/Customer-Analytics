import React, { useCallback } from 'react';
import Papa from 'papaparse';
import { Customer } from '../../types';

interface CSVImporterProps {
  onDataImport: (data: Customer[]) => void;
}

export const CSVImporter: React.FC<CSVImporterProps> = ({ onDataImport }) => {
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      alert('Please upload a CSV file');
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
      transform: (value) => value.trim(),
      complete: (results) => {
        if (results.errors.length > 0) {
          console.error('CSV parsing errors:', results.errors);
          alert('Error parsing CSV file: ' + results.errors[0].message);
          return;
        }

        try {
          const validatedData = validateAndTransformData(results.data);
          onDataImport(validatedData);
        } catch (error) {
          console.error('Data validation error:', error);
          alert('Error validating data: ' + (error as Error).message);
        }
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
        alert('Error reading CSV file: ' + error.message);
      }
    });
  }, [onDataImport]);

  const validateAndTransformData = (data: any[]): Customer[] => {
    return data.map((row, index) => {
      try {
        if (!row.first_name || !row.last_name || !row.email) {
          throw new Error(`Row ${index + 1} is missing required fields`);
        }

        return {
          first_name: String(row.first_name),
          last_name: String(row.last_name),
          email: String(row.email),
          phone: String(row.phone || ''),
          address: String(row.address || ''),
          gender: row.gender as 'male' | 'female',
          age: parseInt(row.age) || 0,
          registered: String(row.registered || ''),
          orders: parseInt(row.orders) || 0,
          spent: parseFloat(row.spent) || 0,
          job: String(row.job || ''),
          hobbies: String(row.hobbies || ''),
          is_married: row.is_married === 'True' || row.is_married === 'TRUE'
        };
      } catch (error) {
        console.error(`Error processing row ${index + 1}:`, row);
        throw error;
      }
    });
  };

  return (
    <div className="p-4 border-2 border-dashed rounded-lg">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100"
      />
      <p className="mt-2 text-sm text-gray-500">
        Upload a CSV file with customer data
      </p>
    </div>
  );
}; 