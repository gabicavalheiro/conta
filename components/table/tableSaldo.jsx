import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import styles from "./tableSaldo.module.css";

function Table() {
    const [indiceAtual, setIndiceAtual] = useState(0);

    const dadosDaTabela = [
        { col1: "Água", col2: "18/ago", col3: "R$700,00"  },
        { col1: "Aluguel", col2: "18/ago", col3: "R$900,00" },
        { col1: "Luz", col2: "19/ago", col3: "R$600,00" },
        { col1: "Lixo", col2: "20/ago", col3: "R$100,00"},
        { col1: "Limpeza", col2: "20/ago", col3: "R$300,00"}
    ];

    const tamanhoPagina = 4;

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
                <thead>
                    <tr>
                        <th colSpan="4" className="text-center">
                            <h1 style={{
                                fontSize: '14px',
                                marginTop: '20px',
                                marginBottom: '20px',
                                fontWeight: '800',
                                display: 'flex',
                                justifyContent: 'center'
                            }}>Próximos vencimentos</h1>
                        </th>
                    </tr>
                </thead>
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
