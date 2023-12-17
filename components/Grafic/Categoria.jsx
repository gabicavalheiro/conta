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
  }, [usuarioId]);

 


  const [dadosDoBanco, setDadosDoBanco] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:54168/graphSaidas/${usuarioId}?mes=11&ano=2023`)
      .then(response => response.json())
      .then(data => setDadosDoBanco(data))
      .catch(error => console.error('Erro ao buscar dados da API:', error));
  }, []);



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

  const chartRef = useRef();
  const myChart = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (myChart.current) {
      myChart.current.destroy();
    }

    myChart.current = new Chart(ctx, config);
  }, []);

  return (
    <div>
        <h1 style={{ fontSize: '14px', marginTop:'20px', marginBottom:'0', fontWeight:'800'}}>Despesas por categoria</h1>
      <canvas ref={chartRef} style={{ padding:'50px 50px' , marginBottom: '20px' }}></canvas>
    </div>
  );
}

export default Categoria;
