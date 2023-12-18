import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import styles from './Ultimas.module.css';

function Proximos() {
    const [indiceAtual, setIndiceAtual] = useState(0);
    const [dadosDaTabela, setDadosDaTabela] = useState([]);

    const tamanhoPagina = 4;

    useEffect(() => {
        // Função para buscar dados da API
        const fetchData = async () => {
            try {
                const response = await fetch("https://api-conta-certa-production.up.railway.app/graphproximos/21?mes=11&ano=2023");
                const data = await response.json();
                // Organizar os dados por descrição
                const dadosOrdenados = data.sort((a, b) => a.descricao.localeCompare(b.descricao));
                setDadosDaTabela(dadosOrdenados);
            } catch (error) {
                console.error("Erro ao buscar dados da API", error);
            }
        };

        // Chamar a função para buscar dados ao carregar o componente
        fetchData();
    }, []);

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
                            <td>{linha.descricao}</td>
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
