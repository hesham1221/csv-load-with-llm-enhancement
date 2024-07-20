# CSV Load with LLM Enhancement

## Overview

This project is a backend service built with NestJS and Mongoose to manage medical products and their variants. It includes functionality to import large CSV files, save data to MongoDB, and enhance product descriptions using an LLM service. The project uses the strategy pattern to easily integrate different LLM strategies based on demand.

## Installation

### Prerequisites

- Node.js (v18.x or later)
- MongoDB
- Docker (optional)

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/hesham1221/csv-load-with-llm-enhancement
   cd csv-load-with-llm-enhancement
   ```

2. Install dependencies using `pnpm`:

   ```bash
   pnpm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   MONGODB_URI=mongodb://localhost:27017/yourdatabase
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Start the application:

   ```bash
   pnpm start
   ```

5. (Optional) Start the application using Docker:

   ```bash
   docker-compose up --build
   ```

## Usage

### Import Products from CSV

To import products from a CSV file, use the `ProductService`'s `importProductsFromCSV` method. Ensure the CSV file is formatted correctly.

### Strategy Pattern for LLM Integration

The project uses the strategy pattern to allow easy integration of different LLM strategies. This design makes it flexible to switch or add new LLM services based on demand.
