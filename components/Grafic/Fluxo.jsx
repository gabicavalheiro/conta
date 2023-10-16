import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { format, addMonths } from 'date-fns';

export default function Fluxo() {
  const chartRef = useRef();
  const myChart = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (myChart.current) {
      myChart.current.destroy();
    }

    myChart.current = new Chart(ctx, config);
  }, []);

  // Gerar rótulos de meses usando date-fns
  const startDate = new Date(); // Data inicial
  const labels = [];
  for (let i = 0; i < 7; i++) {
    labels.push(format(addMonths(startDate, i), 'MMMM'));
  }

  const data = {
    labels: labels,
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  const config = {
    type: 'line',
    data,
    options: {
      indexAxis: 'y',
      plugins: {
        legend: {
          display: false
        },
        datalabels: {
          display: true,
          color: 'black',
          anchor: 'end',
          align: 'end',
          font: {
            weight: 'bold'
          }
        }
      }
    }
  };

  return (
    <div>
      <canvas ref={chartRef} style={{ width: '400px', height: '300px', padding: '20px', fontWeight: '800' }}></canvas>
    </div>
  );
}
