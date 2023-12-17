import Link from "next/link";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./NavBar.module.css";
import { BsArrowLeftCircleFill } from "react-icons/bs";

export default function NavBar() {
  return (
    <div className={styles.nav}>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid float-left">
          <div className={styles.margin_left}>
            <Link className="navbar-brand" href="/">
              <img
                src="../logoVerde.png"
                alt="Logo"
                width="100"
                height="100"
                className="d-inline-block align-text-top"
              />
            </Link>
          </div>
          <div className={styles.bold}>
            <Link className="navbar-brand" href="/Home">
              Home
            </Link>
          </div>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                ></Link>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <div className={styles.margin_right}>
            <div className="collapse navbar-collapse float-end" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item" href="/">
                  <Link className="nav-link" href="/">
                    <div className={styles.bold}>
                      <div className={styles.icon}>
                        <BsArrowLeftCircleFill />
                      </div>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
