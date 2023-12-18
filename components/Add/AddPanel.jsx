import React, { useState } from "react";
import styles from './AddPanel.module.css'
import DropdownButton from '../button/DropdownButton';
import "bootstrap/dist/css/bootstrap.css";
import DropdownWithInput from '../button/DropdownInput';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdicionarSaida from "@/pages/Adicionar-saida";
import { useForm } from "react-hook-form"
import { useRouter } from "next/router";
import { useEffect } from "react";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);



export default function AddPanel({ isCardConfirmVisible, onEnviarClick, onCancelarClick }) {

    let num_parcelas;


    const router = useRouter();
    const usuarioId = router.query.usuarioId;


    useEffect(() => {
        if (usuarioId) {
            console.log('Usuário ID ass painel:', usuarioId);
        }
    }, [usuarioId]);


    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");


    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            num_parcelas: 0,
            usuario_id: usuarioId,
            //metodo:"Pix"
        }
    });

    async function enviaDados(data) {


        data.categoria = selectedCategory;
        data.metodo = selectedPaymentMethod;
        const response = await fetch("https://api-conta-certa-production.up.railway.app/entradas",
            {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ ...data })
            },
        )
        const dados = await response.json()

        if (response.status == 201) {
            reset()
        } else {
            console.log(dados);

        }
    }

    const [isCreditSelected, setIsCreditSelected] = useState(false);



   
};

const handleSubmit = async (event) => {

    event.preventDefault();

    const data = document.getElementById('data').value;
    const valor = document.getElementById('valor').value;
    const categoria = document.getElementById('categoria').value;
    const metodo = document.getElementById('metodo').value;
    const descricao = document.getElementById('descricao').value;


    const dados = {
        data,
        valor,
        categoria,
        metodo,
        num_parcelas,
        descricao
    };

    MySwal.fire({
        title: 'Confirmação',
        text: 'Deseja enviar essa conta?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        confirmButtonColor: '#009C86',
        cancelButtonText: 'Não',
        iconColor: '#009C86'

    }).then((result) => {
        if (result.isConfirmed) {
            // Enviar os dados para o servidor (por exemplo, usando a API Fetch)
            async function confirm() {
                fetch('http://api-conta-certa-production.up.railway.app/saidas', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dados)
                })
                const dados = await response.json()
                    // .then(response => response.json())
                    // .then(data => {
                    //     console.log('Dados enviados com sucesso:', data);
                    //     // Chame a função passada por propriedade para lidar com o envio
                    //     onEnviarClick();
                    //     // Exibir notificação de sucesso
                    //     MySwal.fire('Sucesso!', 'Formulário enviado com sucesso!', 'success');
                    // })
                    .catch((error) => {
                        console.error('Erro ao enviar os dados:', error);
                        // Exibir notificação de erro
                        MySwal.fire({
                            title: 'Erro',
                            text: 'Erro ao enviar o formulário. Por favor, tente novamente.',
                            icon: 'error',
                            iconColor: '#009C86',
                            confirmButtonText: 'Voltar', // Texto personalizado para o botão de confirmação
                            confirmButtonColor: '#009C86',
                        });
                    });
            }
        }

    });



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
                            <form onSubmit={handleSubmit(enviaDados)}>
                                <div className={styles.form}>
                                    <div className={styles.camp}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label {styles.name}" id={styles.name}    >Data</label>
                                            <input type="date" className={`form-control ${styles.inputName}`} id={styles.inputName} aria-describedby="emailHelp" required   {...register("data")} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label {styles.name}" id={styles.name}>Valor</label>
                                            <input type="number" className={`form-control ${styles.inputName}`} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Valor" required   {...register("valor")} />
                                            <label htmlFor="exampleInputEmail1" className="form-label {styles.name}" id={styles.name}>Data</label>
                                            <input type="date" className={`form-control ${styles.inputName}`} id="data" aria-describedby="emailHelp" required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label {styles.name}" id={styles.name}>Valor</label>
                                            <input type="number" className={`form-control ${styles.inputName}`} id="valor" aria-describedby="emailHelp" placeholder="Valor" required />
                                        </div>
                                    </div>
                                    <div className={styles.pass}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className={`form-label ${styles.input}`} id="categoria" aria-required>
                                                <DropdownWithInput
                                                    title="Categoria"
                                                    action1="Administrativo"
                                                    action2="Financeiro"
                                                    action3="Fixos"
                                                    add="Adicionar Categoria"
                                                    placeholder="Escolha uma categoria"
                                                    className={styles.drop}
                                                    onChange={(selectedValue) => setSelectedCategory(selectedValue)}
                                                    id="categoria"
                                                />
                                            </label>

                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className={`form-label ${styles.input}`} id="metodo" aria-required >
                                                <DropdownWithInput
                                                    title="Método de pagamento"
                                                    action1="Pix"
                                                    action2="Crédito"
                                                    action3="Débito"
                                                    add="Adicionar método de pagamento"
                                                    placeholder="Escolha uma método de pagamento"
                                                    onChange={handlePaymentTypeChange}
                                                    id="metodo"

                                                />
                                            </label>
                                        </div>
                                    </div>

                                    {isCreditSelected && (
                                        <div className={styles.pass}>
                                            <div className="mb-3 mt-4">
                                                <label htmlFor="exampleInputPassword1" className="form-label" style={{ fontWeight: "bolder" }} id="parcela">
                                                    Número de Parcelas
                                                    <input type="number" className={`form-control mt-3 ${styles.parc}`} id="parcela"    {...register("num_parcelas")} />
                                                    <input type="number" className={`form-control mt-3 ${styles.parc}`} id="parcela" required />
                                                </label>
                                            </div>
                                        </div>
                                    )}


                                    <div className={styles.pass}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className={`form-label ${styles.desc}`} id="descricao" >
                                                Descrição
                                                <input type="text" className={`form-control mt-3 ${styles.descc}`} id="descricao"   {...register("descricao")} />
                                                <input type="text" className={`form-control mt-3 ${styles.descc}`} id="descricao" required />
                                            </label>
                                        </div>
                                    </div>


                                    <div className={styles.botoes}>
                                        <button type="submit" className={styles.botao_enviar} >
                                            Confirmar
                                        </button>
                                        <button type="button" className={styles.botao_cancel}>
                                            Cancelar
                                        </button>
                                        <button type="submit" className={styles.botao_enviar} onClick={handleSubmit} >Confirmar</button>
                                        <button type="submit" className={styles.botao_cancel}>Cancelar</button>
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
