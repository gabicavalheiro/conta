import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels';

export default function Futuras() {
  const chartRef = useRef();
  const myChart = useRef(null);

  const labels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const data = {
    labels: labels,
    datasets: [{
      axis: 'y',
      data: [7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000],
      fill: false,
      backgroundColor: [
        'rgba(0, 223, 191, 1)'
      ],
      borderWidth: 1
    }]
  };

  const config = {
    type: 'bar',
    data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
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

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (myChart.current) {
      myChart.current.destroy();
    }

    myChart.current = new Chart(ctx, config);
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: '14px', marginTop: '20px', marginBottom: '0', fontWeight:'800' }}>Despesas Futuras</h1>
      <canvas ref={chartRef} style={{ width: '400px', padding: '20px', fontWeight: '800' }}></canvas>
    </div>
  );
}
