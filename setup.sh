#!/bin/bash

# Create project directory
mkdir ai-customer-analytics
cd ai-customer-analytics

# Initialize a new React + TypeScript project using Vite
npm create vite@latest . -- --template react-ts

# Install dependencies
npm install

# Install additional dependencies
npm install \
  @tensorflow/tfjs \
  recharts \
  papaparse \
  @types/papaparse \
  tailwindcss \
  postcss \
  autoprefixer \
  @radix-ui/themes \
  @radix-ui/react-icons

# Initialize Tailwind CSS
npx tailwindcss init -p

# Create project structure
mkdir -p src/components/{Dashboard,DataImport,common}
mkdir -p src/services
mkdir -p src/types 