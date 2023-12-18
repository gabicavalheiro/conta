import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import styles from "./tableSaldo.module.css";
import { useEffect } from "react";

function Table() {
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
            <div className={styles.table}>
            <table className="table">
            
                <tbody>
                    {proximosDados.map((linha, index) => (
                        <tr key={index} className="ml-3" >
                            <td>{linha.col1}</td>
                            <td> {linha.col2}</td>
                            <td><strong>{linha.col3}</strong></td>
                            <td>{linha.col4}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="4">
                            {indiceAtual > 0 && (
                                <button className={styles.button} onClick={handleClickAnterior}>
                                    <i className="bi bi-arrow-up-short" id={styles.button}></i> 
                                </button>
                            )}
                            {indiceAtual + tamanhoPagina < dadosDaTabela.length && (
                                <button className={styles.button} onClick={handleClickProximo}>
                                    <i className="bi bi-arrow-down-short" id={styles.button}></i> 
                                </button>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default Table;
