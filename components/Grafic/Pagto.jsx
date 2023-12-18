import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useRouter } from 'next/router';
import { useState } from 'react';



function Pagto() {



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
         
          return;
        }

        const response = await fetch(`https://api-conta-certa-production.up.railway.app/graphMetodoValorData/${usuarioId}?mes=11&ano=2023`);
        const response2 = await fetch(`https://api-conta-certa-production.up.railway.app/graphValorParcela/${usuarioId}?mes=11&ano=2023`);
        
        if (!response.ok) {
          
          console.error('Erro ao obter dados:', response.statusText);
          return;
        }

        const dados = await response.json();
        const dados2 = await response2.json()
        
       // console.log(dados);
        setDadosDoBanco(dados);
        setDadosDoBanco2(dados2);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    }

    getDadosGrafico();
  }, [usuarioId]);

  
  const [dadosDoBanco, setDadosDoBanco] = useState([]);
  const [dadosDoBanco2, setDadosDoBanco2] = useState([]);
 
  const chartRef = useRef();
  const myChart = useRef(null);
  
  

  //const a = dadosDoBanco2[0].total_parcela;
  
  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    
    if (dadosDoBanco.length > 0) {
      
      const data = {
        labels: dadosDoBanco.map(item => item.metodo),
        datasets: [{
          label: "total",
          data: dadosDoBanco.map(item => item.total),
          backgroundColor: [
            'rgba(0, 223, 191, 1)',
            'rgba(25, 119, 243, 1)',
           'rgba(0, 156, 134, 1)'
          ],
          hoverOffset: 4
        }]
      };

      const config = {
        type: 'doughnut',
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
      <h1 style={{ fontSize: '14px', marginTop: '20px', marginBottom: '0', fontWeight:'800' }}>Despesas por pagamento</h1>
      <canvas ref={chartRef} style={{ width: '300px', height: '300px', padding: '50px' }}></canvas>
    </div>
  );
}

export default Pagto;
