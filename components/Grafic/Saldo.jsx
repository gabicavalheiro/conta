import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels';
import { useRouter } from 'next/router';

export default function Saldo() {

  const router = useRouter();
  const usuarioId = router.query.usuarioId;

  const chartRef = useRef();
  const myChart = useRef(null);
  const [entradaData, setEntradaData] = useState([]);
  const [saidaData, setSaidaData] = useState([]);

  useEffect(() => {
    if (usuarioId) {
      console.log('Usuário ID:', usuarioId);
      // Lógica adicional que depende de usuarioId
    }
    
    
    async function getDadosGrafico() {
      try {
        if (!usuarioId) {
         
          return;
        }

        const response = await fetch(`https://api-conta-certa-production.up.railway.app/totalEntradas/${usuarioId}?mes=12&ano=2023`);
        const response2 = await fetch(`https://api-conta-certa-production.up.railway.app/totalSaidas/${usuarioId}?mes=12&ano=2023`);
        
        if (!response.ok) {
          
          console.error('Erro ao obter dados:', response.statusText);
          return;
        }

        const dados = await response.json();
        const dados2 = await response2.json()
        
       // console.log(dados);
        setEntradaData(Number(dados[0]?.total) || 0);
        setSaidaData(Number(dados2[0]?.total) || 0);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    }

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
      <canvas ref={chartRef} style={{ width: '400px', height: '300px', padding: '20px', fontWeight:'800' }}></canvas>
    </div>
  );
}