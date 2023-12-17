import React, { useState } from "react";
import styles from './AddPanel.module.css'
import DropdownButton from '../button/DropdownButton';
import "bootstrap/dist/css/bootstrap.css";
import DropdownWithInput from '../button/DropdownInput';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdicionarSaida from "@/pages/Adicionar-saida";


export default function AddPanel() {

    const [isCreditSelected, setIsCreditSelected] = useState(false);
    const handlePaymentTypeChange = (value) => {
        setIsCreditSelected(value === "Crédito");
    };

    function handleSubmit(event) {
        event.preventDefault();

        // Pegar os valores dos campos do formulário
        const data = document.getElementById('data').value;
        const valor = document.getElementById('valor').value;
        const categoria = document.getElementById('categoria').value;
        const metodo = document.getElementById('formaDePagamento').value;
        const numeroDeParcelas = document.getElementById('parcela').value;
        const descricao = document.getElementById('descricao').value;

        // Criar um objeto para armazenar os dados
        const dados = {
            data,
            valor,
            categoria,
            metodo,
            numeroDeParcelas,
            descricao
        };

        // Enviar os dados para o servidor (por exemplo, usando a API Fetch)
        fetch('http://api-conta-certa-production.up.railway.app/saidas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Dados enviados com sucesso:', data);
            })
            .catch((error) => {
                console.error('Erro ao enviar os dados:', error);
            });
    }
    return (
        <section className={styles.page}>
            <>

                <div className={styles.button}>


                    <DropdownButton
                        toggleText="Nova entrada"
                        action1Text="Nova saída"
                        action1href="/Adicionar-saida"
                    />

                </div>

                <div className={styles.box}>
                    <section>
                        <div className={styles.form}>
                            <form>
                                <div className={styles.form}>
                                    <div className={styles.camp}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label {styles.name}" id={styles.name}>Data</label>
                                            <input type="date" className={`form-control ${styles.inputName}`} id={styles.inputName} aria-describedby="emailHelp" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label {styles.name}" id={styles.name}>Valor</label>
                                            <input type="email" className={`form-control ${styles.inputName}`} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Valor" />
                                        </div>
                                    </div>
                                    <div className={styles.pass}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className={`form-label ${styles.input}`} id={styles.input} >
                                                <DropdownWithInput
                                                    title="Categoria"
                                                    action1="Administrativo"
                                                    action2="Financeiro"
                                                    action3="Fixos"
                                                    add="Adicionar Categoria"
                                                    placeholder="Escolha uma categoria"
                                                    className={styles.drop}
                                                />
                                            </label>

                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className={`form-label ${styles.input}`} id={styles.input}>
                                                <DropdownWithInput
                                                    title="Método de pagamento"
                                                    action1="Pix"
                                                    action2="Crédito"
                                                    action3="Débito"
                                                    add="Adicionar método de pagamento"
                                                    placeholder="Escolha uma método de pagamento"
                                                    onChange={handlePaymentTypeChange}
                                                />
                                            </label>
                                        </div>
                                    </div>

                                    {isCreditSelected && (
                                        <div className={styles.pass}>
                                            <div className="mb-3 mt-4">
                                                <label htmlFor="exampleInputPassword1" className="form-label" style={{ fontWeight: "bolder" }}>
                                                    Número de Parcelas
                                                    <input type="number" className={`form-control mt-3 ${styles.parc}`} id="parcela" />
                                                </label>
                                            </div>
                                        </div>
                                    )}


                                    <div className={styles.pass}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className={`form-label ${styles.desc}`} id={styles.name}>
                                                Descrição
                                                <input type="text" className={`form-control mt-3 ${styles.descc}`} id="descricao" />
                                            </label>
                                        </div>
                                    </div>


                                    <div className={styles.botoes}>
                                        <button type="button" className={styles.botao_enviar} onClick={handleSubmit}>
                                            Confirmar
                                        </button>
                                        <button type="button" className={styles.botao_cancel}>
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
              
        </>
        </section >
    )
}
