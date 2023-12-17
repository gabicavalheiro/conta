import React, { useState } from "react";
import styles from "./Cadastro.module.css";
import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";
import { FaFacebook, FaApple, FaGoogle } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdInfo, MdVisibility, MdVisibilityOff } from "react-icons/md";

export default function Cadastro() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    segundaSenha: "",
  });

  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [infoIconActive, setInfoIconActive] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Reset password error when the user types in the confirmation password field
    if (e.target.name === "segundaSenha") {
      setPasswordError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.senha !== formData.segundaSenha) {
      setPasswordError(true);
      return; // Don't proceed with submission if there's a password error
    }

    try {
      const response = await fetch(
        "https://api-conta-certa-production.up.railway.app/usuarios",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Dados enviados com sucesso!");
        toast.success("Cadastro realizado com sucesso!", {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => {
          window.location.href = "/Login";
        }, 2000);
      } else {
        console.error(
          "Erro ao enviar os dados:",
          await response.text()
        );
        toast.error("Erro no cadastro. Por favor, tente novamente.", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.error("Erro durante a solicitação:", error);
      toast.error("Erro no cadastro. Por favor, tente novamente.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <section className={styles.section} id="contato">
      <div className={styles.image}>
        <Link href="/">
          <img src="./logoBranco.png" alt="logo" width={200} height={200} />
        </Link>
      </div>
      <div className={styles.box}>
        <div className={styles.form}>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Seu nome completo"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
              />
              <label htmlFor="floatingInput">Seu nome completo</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingEmail"
                placeholder="name@example.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <label htmlFor="floatingEmail">E-mail</label>
            </div>
            <div className="form-floating mb-3 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="floatingPassword"
                placeholder="Sua senha"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
              />
              <label htmlFor="floatingPassword">Sua senha</label>
              <div
                className="position-absolute top-50 translate-middle-y"
                style={{ right: "0.5rem" }}
              >
                <button
                  type="button"
                  className={`btn ${styles.showHideButton}`}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    cursor: "pointer",
                    background: "rgba(0, 0, 0, 0)",
                    border: "none",
                    marginRight: "-0.3rem", // Espaçamento entre os botões
                  }}
                >
                  {showPassword ? (
                    <MdVisibilityOff style={{ color: "grey" }} />
                  ) : (
                    <MdVisibility style={{ color: "grey" }} />
                  )}
                </button>
                <button
                  type="button"
                  className={`btn ${styles.infoIcon}`}
                  id="infoIcon"
                  onClick={() => setInfoIconActive(!infoIconActive)}
                  style={{
                    cursor: "default",
                    background: "rgba(0, 0, 0, 0)",
                    border: "none",
                    marginLeft: "0.2rem", // Espaçamento entre os botões
                  }}
                >
                  <MdInfo style={{ color: "grey" }} />
                </button>
              </div>
            </div>
            <div className="form-floating mb-3 position-relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className={`form-control ${
                  passwordError ? styles.errorInput : ""
                }`}
                id="floatingSecondPassword"
                placeholder="Confirme sua senha"
                name="segundaSenha"
                value={formData.segundaSenha}
                onChange={handleChange}
              />
              <label htmlFor="floatingSecondPassword">
                Confirme sua senha
              </label>
              <div
                className="position-absolute top-50 translate-middle-y"
                style={{ right: "0.5rem" }}
              >
                <button
                  type="button"
                  className={`btn ${styles.showHideButton}`}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    cursor: "pointer",
                    background: "rgba(0, 0, 0, 0)",
                    border: "none",
                    marginRight: "-0.3rem", // Espaçamento entre os botões
                  }}
                >
                  {showConfirmPassword ? (
                    <MdVisibilityOff style={{ color: "grey" }} />
                  ) : (
                    <MdVisibility style={{ color: "grey" }} />
                  )}
                </button>
              </div>
              {passwordError && (
                <div className={`text-danger ${styles.errorText}`}>
                  As senhas não coincidem.
                </div>
              )}
            </div>
            <div className={styles.buttonBox}>
              <button type="submit" className={styles.button}>
                Criar conta
              </button>
              <button className={styles.buttonCancelar}>
                <Link href="/" className={styles.botaoCancel}>
                  Cancelar
                </Link>
              </button>
            </div>
          </form>
          <ToastContainer />
          <div className={styles.boxA}>
            <div className={styles.access}>
              <h1>Acessar com:</h1>
              <div className={styles.icons}>
                <FaFacebook />
                <FaGoogle />
                <FaApple />
              </div>
              <div className={styles.cadas}>
                <h1>
                  Já possui uma conta?{" "}
                  <Link className={styles.cadastro} href="/Login">
                    Entre.
                  </Link>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
