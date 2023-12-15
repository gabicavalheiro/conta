import "bootstrap/dist/css/bootstrap.css";
import styles from './Add.module.css'
import NavBar from '@/components/NavBar/NavBar'
import DropdownButton from '@/components/button/DropdownButton'
import AddPanel from "@/components/Add/AddPanel";

export default function Add(){
    return(
        <section className={styles.section}>
            <NavBar/>
            <div className={styles.border}> </div>
            <div className={styles.panel}> <AddPanel /></div>
        </section>
    )
}