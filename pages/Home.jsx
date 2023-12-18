"use client";
import NavBar from "@/components/NavBar/NavBar";
import styles from "./Initial.module.css";
import "bootstrap/dist/css/bootstrap.css";
import Saldo from "@/components/Grafic/Saldo";
import Pagto from "@/components/Grafic/Pagto";
import Categoria from "@/components/Grafic/Categoria";
import Fluxo from "@/components/Grafic/Fluxo";
import Ultimas from "@/components/Grafic/Ultimas";
import Proximos from "@/components/Grafic/Proximos";
import Futuras from "@/components/Grafic/Futuras";
import 'bootstrap-icons/font/bootstrap-icons.css';
import FloatingButton from "@/components/button/FloatingButton";
import { useRouter } from 'next/router';
import { useEffect } from "react";


export default function () {



  const router = useRouter();
  const usuarioId = router.query.usuarioId;
console.log(usuarioId);


  useEffect(() => {
    if (usuarioId) {
      console.log('Usuário ID:', usuarioId);
       
    }
  }, [usuarioId]);

  return (
    <section className={styles.section}>
      <NavBar />
      <div className={styles.border}> </div>
      <div className={styles.row}>
        <div className="container text-center">
        <div className={styles.row}>
          <div className="row">
            <div className="col">
              <div className={styles.boxSaldo}>
                <Saldo usuarioId={usuarioId}/>
              </div>
            </div>
            <div className="col">
              <div className={styles.boxTwo}>
                <Pagto usuarioId={usuarioId} />
              </div>
            </div>
            <div className="col ms-0">
              <div className={styles.box}>
                <Categoria usuarioId={usuarioId}/>
              </div>
            </div>
          </div>
          <div className={styles.secondRow}>
          <div className="row">
            <div className="col">
              <div className={styles.boxSaldo}>
                <Fluxo usuarioId={usuarioId}/>
              </div>
            </div>
            <div className="col">
              <div className={styles.boxUltimas}>
             <Ultimas usuarioId={usuarioId}/>
              </div>
            </div>
            </div>
          </div>
          <div className={styles.thirdRow}>
          <div className="row">
            <div className="col">
              <div className={styles.boxSaldo}>
                <Proximos usuarioId={usuarioId}/>
              </div>
            </div>
            <div className="col">
              <div className={styles.boxUltimas}>
                <Futuras usuarioId={usuarioId}/>
              </div>
            </div>
            </div>
            </div>.

            <FloatingButton   usuarioId={usuarioId}/>
          </div>
          </div>
        </div>
    
        
        
    </section>
  );
}
