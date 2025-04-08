import { Link } from "react-router-dom"
import Container from "./Container"
import styles from './Navbar.module.css'

function Navbar(){
    return(

        <nav className={styles.navbar}>
            <p className={styles.p}>StockWatcher</p>
            <Container>
                <ul className={styles.list}>
                    <li className={styles.item}><Link to="/">Home</Link></li>
                    <li className={styles.item}><Link to="/mystocks">Minhas ações</Link></li>


                </ul>
            </Container>
      </nav>

    )
}

export default Navbar