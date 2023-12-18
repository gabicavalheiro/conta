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
          num_parcelas:0,
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



    const handlePaymentTypeChange = (value) => {
        setSelectedPaymentMethod(value);
    };



    
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
                                            <input type="date" className={`form-control ${styles.inputName}`} id={styles.inputName} aria-describedby="emailHelp"  required   {...register("data")}/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label {styles.name}" id={styles.name}>Valor</label>
                                            <input type="number" className={`form-control ${styles.inputName}`} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Valor" required   {...register("valor")} />
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
                                                    <input type="number" className={`form-control mt-3 ${styles.parc}`} id="parcela"    {...register("num_parcelas")}/>
                                                </label>
                                            </div>
                                        </div>
                                    )}


                                    <div className={styles.pass}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className={`form-label ${styles.desc}`}  id="descricao" >
                                                Descrição
                                                <input type="text" className={`form-control mt-3 ${styles.descc}`} id="descricao"   {...register("descricao")} />
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
