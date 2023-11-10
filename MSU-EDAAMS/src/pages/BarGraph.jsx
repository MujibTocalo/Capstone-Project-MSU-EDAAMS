// BarGraph.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarGraph = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(item => item.category),
        datasets: [
          {
            label: 'Initial Count',
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
            data: data.map(item => item.initialCount),
          },
        ],
      },
      options: {
        scales: {
          x: { stacked: true },
          y: { stacked: true },
        },
      },
    });
  }, [data]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Bar Graph</h2>
      <canvas ref={chartRef} width="400" height="200"></canvas>
    </div>
  );
};

export default BarGraph;
