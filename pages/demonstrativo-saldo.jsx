import "bootstrap/dist/css/bootstrap.css";
import styles from './demosntartivo-saldo.module.css'
import NavBar from "@/components/NavBar/NavBar";
import ApiButton from "@/components/button/selectDateButton";
import Table from "@/components/table/tableSaldo";
import { useRouter } from "next/router";
import { useEffect } from "react";


export default function demonstrativoSaldo() {
    const router = useRouter();
    const usuarioId = router.query.usuarioId;



  
    useEffect(() => {
      if (usuarioId) {
        console.log('Usuário ID:', usuarioId);
         
      }
    }, [usuarioId]);


    return (

        <section className={styles.section}>
            <NavBar />
            <div className={styles.border}> </div>

            <div className={styles.div}>
                <div className={styles.box}>

                    <div className={styles.select}>
                        <ApiButton />
                    </div>

                    <div className={styles.a}>
                        <div className={styles.boxx}>
                            <div className={styles.box_entrada}>Entradas</div>
                            <div className={styles.box_saida}>Saídas</div>
                            <div className={styles.box_saldo}>Saldo</div>
                        </div>
                    </div>
                    <div className={styles.table}>
                        <Table usuarioId={usuarioId}/>
                    </div>
                </div>
            </div>
        </section>
    )
}