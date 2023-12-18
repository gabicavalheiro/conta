import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels';
import { useRouter } from 'next/router';

export default function Saldo() {
  const router = useRouter();
  const usuarioId = router.query.usuarioId;

  const chartRef = useRef();
  const myChart = useRef(null);
  const [entradaData, setEntradaData] = useState(0);
  const [saidaData, setSaidaData] = useState(0);

  useEffect(() => {
    const getDadosGrafico = async () => {
      try {
        if (!usuarioId) {
          return;
        }

        const responseEntradas = await fetch(`https://api-conta-certa-production.up.railway.app/totalEntradas/${usuarioId}?mes=12&ano=2023`);
        const responseSaidas = await fetch(`https://api-conta-certa-production.up.railway.app/totalSaidas/${usuarioId}?mes=12&ano=2023`);

        if (!responseEntradas.ok || !responseSaidas.ok) {
          console.error('Erro ao obter dados da API');
          return;
        }

        const dadosEntradas = await responseEntradas.json();
        const dadosSaidas = await responseSaidas.json();

        setEntradaData(Number(dadosEntradas[0]?.total) || 0);
        setSaidaData(Number(dadosSaidas[0]?.total) || 0);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    getDadosGrafico();
  }, [usuarioId]);

  useEffect(() => {
    const saldoData = entradaData - saidaData;

    const ctx = chartRef.current.getContext('2d');

    if (myChart.current) {
      myChart.current.destroy();
    }

    const config = {
      type: 'bar',
      data: {
        labels: ["Entradas", "Saídas", "Saldo"],
        datasets: [{
          axis: 'y',
          data: [entradaData, saidaData, saldoData],
          fill: false,
          backgroundColor: [
            'rgba(77, 228, 117, 1)',
            'rgba(236, 84, 72, 1)',
            'rgba(0, 223, 191, 1)'
          ],
          borderWidth: 1
        }]
      },
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

    myChart.current = new Chart(ctx, config);
  }, [entradaData, saidaData]);

  return (
    <div>
      <canvas ref={chartRef} style={{ width: '400px', height: '300px', padding: '20px', fontWeight: '800' }}></canvas>
    </div>
  );
}
