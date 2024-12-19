"use client"
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  ChartOptions,
  CategoryScale,
} from 'chart.js';
import StockApiHandler from '../api/stock/stockApiHandler';
import StockDataExtractor, { stockData, dailyValue } from '../api/stock/stockDataExtractor';

ChartJS.register(LineElement, PointElement, LinearScale, TimeScale, Tooltip, Legend, CategoryScale);

const StockChart: React.FC = () => {
  let displayedSymbol: string = ""

  const [symbol, setSymbol] = useState<string>('');
  const [stockData, setStockData] = useState<stockData | null>(null);
  const [error, setError] = useState<string>('');


  // Prepare chart data
  const chartData = stockData
    ? {
        datasets: [
          {
            label: `Stock Price`,
            data: [stockData.dailyValues.map((value: dailyValue, _: number) => {
              return({x: value.date, y: value.close})
            })],
            borderColor: '#ffffff',
            backgroundColor: '#ffffff',
            pointRadius: 3,
            borderWidth: 2,
          },
          
        ],
      }
    : null;

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: { title: { display: true, text: 'Date' }, type: "category" },
      y: { title: { display: true, text: 'Closing Price (USD)' }, min: 0, max: 500 },
    },
  };

  return (
    <div >
      <h2>Aktienkurse Darstellung</h2>
      <div>
        <input
          type="text"
          placeholder="Aktiensymbol eingeben (z.B. AAPL)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          
        />
        <button onClick={async () => {
          if (symbol == "") return;

          const res: Object = await StockApiHandler.getStockData(symbol);
          const data: stockData = StockDataExtractor.extractStockData(res);
          setStockData(data);
          displayedSymbol = symbol
          console.log(data.dailyValues);            

        }}>Kurs anzeigen</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {chartData && (
        <div style={{ marginTop: '20px', width: '90vw', height: '70vh' }}>
          <Line data={chartData} options={options} />
        </div>
      )}
    </div>
  );
};

export default StockChart;
