import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useState } from 'react';
import { useRouter } from 'next/router';

function Categoria() {

  const router = useRouter();
  const usuarioId = router.query.usuarioId;




  useEffect(() => {
    if (usuarioId) {
      console.log('Usuário ID:', usuarioId);
      // Lógica adicional que depende de usuarioId
    }
    
    async function getDadosGrafico() {
      try {
        if (!usuarioId) {
          // Se usuarioId ainda não estiver definido, saia da função
          return;
        }

        const response = await fetch(`https://api-conta-certa-production.up.railway.app/graphSaidas/${usuarioId}?mes=11&ano=2023`);
        
        if (!response.ok) {
          // Se a resposta não estiver ok, trate o erro aqui
          console.error('Erro ao obter dados:', response.statusText);
          return;
        }

        const dados = await response.json();
        console.log(dados);
        setDadosDoBanco(dados);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    }

    getDadosGrafico();
  }, [usuarioId]);

  
  const [dadosDoBanco, setDadosDoBanco] = useState([]);


  const chartRef = useRef();
  const myChart = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Verifica se há dados antes de criar o gráfico
    if (dadosDoBanco.length > 0) {
      const data = {
        labels: dadosDoBanco.map(item => item.categoria),
        datasets: [{
          label: '',
          data: dadosDoBanco.map(item => item.num),
          backgroundColor: [
            'rgba(22, 191, 214, 1)',
            'rgba(179, 247, 238, 1)',
          ],
          hoverOffset: 4
        }]
      };

      const config = {
        type: 'pie',
        data: data,
        options: {
          plugins: {
            legend: {
              position: 'bottom',
            },
          },
        },
      };

      if (myChart.current) {
        myChart.current.destroy();
      }

      myChart.current = new Chart(ctx, config);
    }
  }, [dadosDoBanco]);

  return (
    <div>
      <h1 style={{ fontSize: '14px', marginTop:'20px', marginBottom:'0', fontWeight:'800'}}>Despesas por categoria</h1>
      <canvas ref={chartRef} style={{ padding:'50px 50px' , marginBottom: '20px' }}></canvas>
    </div>
  );
}

export default Categoria;