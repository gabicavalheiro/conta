import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import { useRouter } from 'next/router';
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import styles from './Ultimas.module.css';

function Proximos() {
    const [indiceAtual, setIndiceAtual] = useState(0);
    const [dadosDaTabela, setDadosDaTabela] = useState([]);
    const router = useRouter();
    const { usuarioId } = router.query;

    const tamanhoPagina = 4;

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

        const response = await fetch(`https://api-conta-certa-production.up.railway.app/totalEntradas/${usuarioId}?mes=11&ano=2023`);
        const response2 = await fetch(`https://api-conta-certa-production.up.railway.app/totalSaidas/${usuarioId}?mes=11&ano=2023`);
        
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
        };

        // Chamar a função para buscar dados ao carregar o componente
        fetchData();
    }, [usuarioId]);

    const proximosDados = dadosDaTabela.slice(indiceAtual, indiceAtual + tamanhoPagina);

    const handleClickProximo = () => {
        if (indiceAtual + tamanhoPagina < dadosDaTabela.length) {
            setIndiceAtual(indiceAtual + tamanhoPagina);
        }
    };

    const handleClickAnterior = () => {
        if (indiceAtual - tamanhoPagina >= 0) {
            setIndiceAtual(indiceAtual - tamanhoPagina);
        }
    };

    return (
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th colSpan="3" className="text-center">
                            <h1 style={{
                                fontSize: '14px',
                                marginTop: '20px',
                                marginBottom: '20px',
                                fontWeight: '800',
                            }}>Próximos vencimentos</h1>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {proximosDados.map((linha, index) => (
                        <tr key={index}>
                            <td>{linha.descricao.charAt(0).toUpperCase() + linha.descricao.slice(1)}</td>
                            <td>{format(new Date(linha.data), 'MMMM/yyyy', { locale: ptBR })}</td>
                            <td><strong>R$ {linha.valor}</strong></td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="3">
                            {indiceAtual > 0 && (
                                <button className={styles.button} onClick={handleClickAnterior}>
                                    <i className="bi bi-arrow-up-short"></i>
                                </button>
                            )}
                            {indiceAtual + tamanhoPagina < dadosDaTabela.length && (
                                <button className={styles.button} onClick={handleClickProximo}>
                                    <i className="bi bi-arrow-down-short"></i>
                                </button>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Proximos;
