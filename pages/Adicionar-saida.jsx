import "bootstrap/dist/css/bootstrap.css";
import styles from './Add.module.css'
import NavBar from '@/components/NavBar/NavBar'
import DropdownButton from '@/components/button/DropdownButton'
import AddPanel from "@/components/Add/AddPanel";
import AddSaida from "@/components/Add/AddSaida";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Add(){

    const router = useRouter();
    const usuarioId = router.query.usuarioId;

  
  
    useEffect(() => {
      if (usuarioId) {
  
      }
    }, [usuarioId]);

    return(
        <section className={styles.section}>
            <NavBar/>
            <div className={styles.border}> </div>
            <div className={styles.panel}> <AddSaida usuarioId={usuarioId}/></div>
        </section>
    )
}