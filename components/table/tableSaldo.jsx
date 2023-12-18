import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import styles from './tableSaldo.module.css';
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Table() {
    const [indiceAtual, setIndiceAtual] = useState(0);
    const [dadosDaTabela, setDadosDaTabela] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const router = useRouter();
    const usuarioId = router.query.usuarioId;

    useEffect(() => {
        if (usuarioId) {
            console.log('Usuário ID:', usuarioId);
        }
    }, [usuarioId]);

    const tamanhoPagina = 4;

    useEffect(() => {
        // Função para buscar dados da API
        const fetchData = async () => {
            try {
                const formattedDate = format(selectedDate, 'MM-yyyy');
                const response = await fetch(`https://api-conta-certa-production.up.railway.app/saidasMesIndex/${usuarioId}1?mes=1&ano=2023`);
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
    }, [selectedDate, usuarioId]);

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
            <div className={`date-picker-container ${styles.datepickcon}`}>
                <div className={styles.btn}>
                    <label>Data:</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        className={styles.date}
                    />
                </div>

                <div className={styles.a}>
                        <div className={styles.boxx}>
                            <div className={styles.box_entrada}>Entradas</div>
                            <div className={styles.box_saida}>Saídas</div>
                            <div className={styles.box_saldo}>Saldo</div>
                        </div>
                    </div>

                <div className={styles.table}>


                    <table className="table">
                        <thead>
                            <tr>
                                <th colSpan="3" className="text-center">
                                    <h1 style={{
                                        fontSize: '14px',
                                        marginTop: '20px',
                                        marginBottom: '20px',
                                        fontWeight: '800',
                                    }}>Neste mês</h1>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {proximosDados.map((linha, index) => (
                                <tr key={index}>
                                    <td>{linha.descricao.charAt(0).toUpperCase() + linha.descricao.slice(1)}</td>
                                    <td>{format(new Date(linha.data), 'dd/MMMM/yyyy', { locale: ptBR })}</td>
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
            </div>
        </div>
    );
}

export default Table;
