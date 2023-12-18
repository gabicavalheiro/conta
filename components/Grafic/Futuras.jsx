import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels';
import { useRouter } from 'next/router';

export default function Futuras() {
  const chartRef = useRef();
  const myChart = useRef(null);

  const router = useRouter();
  const usuarioId = router.query.usuarioId;

  const [entradaData, setEntradaData] = useState([]);

  useEffect(() => {
    getDadosGrafico();
  }, [usuarioId]);

  async function getDadosGrafico() {
    try {
      if (!usuarioId) {
        return;
      }

      const response = await fetch(`https://api-conta-certa-production.up.railway.app/totalDespesasAno/${usuarioId}?ano=2023`);

      if (!response.ok) {
        console.error('Erro ao obter dados:', response.statusText);
        return;
      }

      const dados = await response.json();

      const dadosProcessados = dados.map((item) => ({
        mes: item.mes,
        nomeMes: item.nomeMes,
        total: Number(item.total),
      }));

      const totaisPorMes = dadosProcessados.map((item) => item.total);
      setEntradaData(totaisPorMes);
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
    }
  }

  const labels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

  const data = {
    labels: labels,
    datasets: [{
      axis: 'y',
      data: entradaData,
      fill: false,
      backgroundColor: ['rgba(0, 223, 191, 1)'],
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
  }, [config]);

  return (
    <div>
      <h1 style={{ fontSize: '14px', marginTop: '20px', marginBottom: '0', fontWeight: '800' }}>Despesas Anuais</h1>
      <canvas ref={chartRef} style={{ width: '400px', padding: '20px', fontWeight: '800' }}></canvas>
    </div>
  );
}
