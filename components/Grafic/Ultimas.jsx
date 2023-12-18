import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/router';
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import styles from './Ultimas.module.css';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';

function Ultimas() {
    const [indiceAtual, setIndiceAtual] = useState(0);
    const [apiData, setApiData] = useState([]);
    const [exibirGrafico, setExibirGrafico] = useState(true);
    const router = useRouter();
    const { usuarioId } = router.query;

    const tamanhoPagina = 4;

    const proximosDados = apiData.slice(indiceAtual, indiceAtual + tamanhoPagina);

    const handleClickProximo = () => {
        if (indiceAtual + tamanhoPagina < apiData.length) {
            setIndiceAtual(indiceAtual + tamanhoPagina);
        }
    };

    const handleClickAnterior = () => {
        if (indiceAtual - tamanhoPagina >= 0) {
            setIndiceAtual(indiceAtual - tamanhoPagina);
        }
    };

    const chartRef = useRef();
    const myChart = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!usuarioId) {
                    // Se o usuarioId não estiver disponível, não fazemos a requisição
                    return;
                }

                const response = await axios.get(`https://api-conta-certa-production.up.railway.app/graphpassadas/${usuarioId}?mes=12&ano=2023`);
                setApiData(response.data.map(entry => ({
                    ...entry,
                    descricao: entry.descricao ? entry.descricao.charAt(0).toUpperCase() + entry.descricao.slice(1) : 'Aleatórios',
                })));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Chamar a função para buscar dados ao carregar o componente
        fetchData();
    }, [usuarioId]);

    console.log(proximosDados, "oi");

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');

            if (myChart.current) {
                myChart.current.destroy();
            }

            const data = {
                labels: proximosDados.map(entry => entry.descricao),
                datasets: [{
                    label: 'My First Dataset',
                    data: proximosDados.map(entry => parseFloat(entry.valor.replace("R$", "").replace(",", "."))),
                    backgroundColor: [
                        'rgba(0, 223, 191, 1)',
                        'rgba(25, 119, 243, 1)',
                        'rgba(0, 156, 134, 1)',
                        'rgba(255, 99, 132, 1)',
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

            myChart.current = new Chart(ctx, config);
        }
    }, [proximosDados]);

    useEffect(() => {
        if (indiceAtual + tamanhoPagina >= apiData.length) {
            setExibirGrafico(false);
        } else {
            setExibirGrafico(true);
        }
    }, [indiceAtual, tamanhoPagina, apiData]);

    return (
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th colSpan="4" className="text-center">
                            <h1 style={{
                                fontSize: '14px',
                                marginTop: '20px',
                                marginBottom: '20px',
                                fontWeight: '800',
                            }}>Últimas despesas</h1>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {proximosDados.map((linha, index) => (
                        <tr key={index}>
                            <td>{linha.descricao}</td>
                            <td>{format(new Date(linha.data), 'MMMM/yyyy', { locale: ptBR })}</td>
                            <td>{linha.metodo}</td>
                            <td><strong>R$ {linha.valor}</strong></td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="4">
                            {indiceAtual > 0 && (
                                <button className={styles.button} onClick={handleClickAnterior}>
                                    <i className="bi bi-arrow-up-short"></i>
                                </button>
                            )}
                            {indiceAtual + tamanhoPagina < apiData.length && (
                                <button className={styles.button} onClick={handleClickProximo}>
                                    <i className="bi bi-arrow-down-short"></i>
                                </button>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
            {exibirGrafico && (
                <canvas ref={chartRef} style={{ width: '300px', height: '300px', padding: '50px' }}></canvas>
            )}
        </div>
    );
}

export default Ultimas;
