import styles from './page.module.css'
import SectionOne from '@/components/SectionOne/SectionOne'
import SectionTwo from '@/components/SectionTwo/SectionTwo'
import SectionThree from '@/components/SectionThree/SectionThree'
import Footer from '@/components/Footer/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';




export default function Home() {

  return (
    <div>
      <div className={styles.bk}>
    <div className={styles.border}> </div>
    </div>
    <main>
    <SectionOne/>
    <SectionTwo/>
    <SectionThree />
    <Footer/>
    <ToastContainer />
    </main>
    </div>
    
  )
}