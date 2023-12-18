import DropdownWithInput from '../button/DropdownInput';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdicionarSaida from "@/pages/Adicionar-saida";
import { useForm } from "react-hook-form"
import { useEffect, useState } from 'react';
import styles from './AddPanel.module.css'
import DropdownButton from '../button/DropdownButton';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useRouter } from 'next/router';

const MySwal = withReactContent(Swal);

export default function AddSaida() {

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
            usuario_id: 21,
            // metodo: "Pix"
        }
    });

    async function enviaDados(data) {
        MySwal.fire({
            title: 'Confirmação',
            text: 'Deseja enviar essa conta?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            confirmButtonColor: '#009C86',
            cancelButtonText: 'Não',
            iconColor: '#009C86'
        }).then(async (result) => {
            if (result.isConfirmed) {

                data.categoria = selectedCategory;
                data.metodo = selectedPaymentMethod;

                const response = await fetch("https://api-conta-certa-production.up.railway.app/saidas", {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({ ...data })
                });

                const dados = await response.json();

                if (response.status === 201) {
                    reset();
                    // Chame a função passada por propriedade para lidar com o envio
                    enviaDados();
                    // Exibir notificação de sucesso
                    MySwal.fire(
                        {
                        title: 'Sucesso',
                        text: 'Conta cadastrada com sucesso!.',
                        icon: 'success',
                        iconColor: '#009C86',
                        confirmButtonText: 'Voltar', // Texto personalizado para o botão de confirmação
                        confirmButtonColor: '#009C86'
                        }
                    );
                } else {
                    console.error(dados);
                    // Exibir notificação de erro
                    MySwal.fire({
                        title: 'Erro',
                        text: 'Erro ao enviar o formulário. Por favor, tente novamente.',
                        icon: 'error',
                        iconColor: '#009C86',
                        confirmButtonText: 'Voltar', // Texto personalizado para o botão de confirmação
                        confirmButtonColor: '#009C86'
                    });
                }
            }
        });
    }

    const handleCancelar = () => {
        
        router.push({
            pathname: '/Home',
            query: { usuarioId},
          });
      };
   

    const [isCreditSelected, setIsCreditSelected] = useState(false);

    const handlePaymentTypeChange = (value) => {
        setIsCreditSelected(value === "Crédito");
    };


    return (
        <section className={styles.page}>
            <>

                <div className={styles.button}>

                <DropdownButton
                        toggleText="Nova saída"
                        action1Text="Nova entrada"
                        action1href={`/Adicionar-conta?usuarioId=${usuarioId}`}
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
                                                    onChange={(selectedValue) => setSelectedCategory(selectedValue)}
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
                                                    action4="Dinheiro"
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
                                                    <input type="number" className={`form-control mt-3 ${styles.parc}`} id="parcela"    {...register("num_parcelas")} />
                                                </label>
                                            </div>
                                        </div>
                                    )}


                                    <div className={styles.pass}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className={`form-label ${styles.desc}`} id={styles.name}>
                                                Descrição
                                                <input type="text" className={`form-control mt-3 ${styles.descc}`} id="descricao"   {...register("descricao")} />
                                            </label>
                                        </div>
                                    </div>


                                    <div className={styles.botoes}>
                                        <button type="submit" className={styles.botao_enviar} >
                                            Confirmar
                                        </button>
                                        <button type="button" className={styles.botao_cancel} onClick={handleCancelar}>
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>

            </>
        </section>
    )
}
