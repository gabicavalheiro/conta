import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { format, addMonths } from 'date-fns';
import { useRouter } from 'next/router';

export default function Fluxo() {
  const chartRef = useRef(null); // Inicialize com null
  const myChart = useRef(null);
  const router = useRouter();
  const usuarioId = router.query.usuarioId;

  useEffect(() => {
    if (usuarioId) {
      // Lógica adicional se necessário com usuarioId
    }
  }, [usuarioId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await fetch(`https://api-conta-certa-production.up.railway.app/saldoAnual/${usuarioId}?ano=2023`).then((response) => response.json());
        
        const labels = apiData.map((item) => item.nomeMes);
        const data = apiData.map((item) => item.saldoLiquido);

        const ctx = chartRef.current?.getContext('2d'); // Use '?.' para evitar erros se chartRef.current for nulo

        if (ctx) {
          if (myChart.current) {
            myChart.current.destroy();
          }

          myChart.current = new Chart(ctx, {
            type: 'line',
            data: {
              labels: labels,
              datasets: [
                {
                  label: 'Saldo Liquido',
                  data: data,
                  fill: false,
                  borderColor: 'rgb(75, 192, 192)',
                  tension: 0.1,
                },
              ],
            },
            options: {
              indexAxis: 'y',
              plugins: {
                legend: {
                  display: false,
                },
                datalabels: {
                  display: true,
                  color: 'black',
                  anchor: 'end',
                  align: 'end',
                  font: {
                    weight: 'bold',
                  },
                },
              },
            },
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [usuarioId]); // Adicione usuarioId como dependência se necessário

  return (
    <div>
      <h1 style={{ fontSize: '14px', marginTop: '20px', marginBottom: '0', fontWeight: '800' }}>Fluxo de caixa</h1>
      <canvas ref={chartRef} style={{ width: '400px', height: '300px', padding: '40px', fontWeight: '800' }}></canvas>
    </div>
  );
}